import { Router } from 'express'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Charger le fichier .env depuis le dossier backend
dotenv.config({ path: join(__dirname, '..', '.env') })

// Vérifier que les variables d'environnement sont définies
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error('❌ Variables Supabase manquantes dans .env')
  console.error('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅' : '❌')
  console.error('SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? '✅' : '❌')
  throw new Error('Variables Supabase requises : SUPABASE_URL et SUPABASE_SERVICE_KEY')
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export default function webhookRoutes(stripeInstance) {
  const router = Router()

  router.post('/stripe', async (req, res) => {
    const sig = req.headers['stripe-signature']
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event

    try {
      event = Stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed.', err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Gérer checkout.session.completed pour les sessions Stripe Checkout
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const metadata = session.metadata || {}
      const userId = metadata.userId
      const packId = metadata.packId
      const credits = Number(metadata.credits || 0)

      if (!userId || !credits) {
        console.error('Metadata manquante dans la session Stripe')
        return res.status(400).json({ error: 'Metadata manquante' })
      }

      try {
        // Récupérer le montant depuis la session
        const amount = session.amount_total / 100 // Convertir de centimes en euros

        // Récupérer le payment_intent pour l'ID
        let paymentIntentId = null
        if (session.payment_intent) {
          const paymentIntent = await stripeInstance.paymentIntents.retrieve(session.payment_intent)
          paymentIntentId = paymentIntent.id
        }

        // Insérer le paiement dans la table payments
        const { error: paymentError } = await supabase.from('payments').insert({
          user_id: userId,
          amount: amount,
          currency: session.currency || 'eur',
          status: 'succeeded',
          stripe_payment_intent_id: paymentIntentId,
        })

        if (paymentError) {
          console.error('Erreur insertion paiement:', paymentError)
          throw paymentError
        }

        // Mettre à jour les crédits de l'utilisateur
        // Récupérer les crédits actuels
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('credits')
          .eq('id', userId)
          .single()

        if (profileError) {
          console.error('Erreur récupération profil:', profileError)
          throw profileError
        }

        const currentCredits = profile?.credits || 0
        const newCredits = currentCredits + credits

        // Mettre à jour les crédits
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ credits: newCredits })
          .eq('id', userId)

        if (updateError) {
          console.error('Erreur mise à jour crédits:', updateError)
          throw updateError
        }

        console.log(`✅ Crédits ajoutés: ${credits} pour l'utilisateur ${userId}. Total: ${newCredits}`)
      } catch (error) {
        console.error('Erreur lors du traitement du webhook:', error)
        return res.status(500).json({ error: 'Erreur traitement webhook' })
      }
    }

    // Gérer aussi payment_intent.succeeded pour compatibilité
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object
      const metadata = paymentIntent.metadata || {}
      const userId = metadata.userId
      const credits = Number(metadata.credits || 0)

      if (userId && credits > 0) {
        try {
          // Vérifier si le paiement n'a pas déjà été traité
          const { data: existingPayment } = await supabase
            .from('payments')
            .select('id')
            .eq('stripe_payment_intent_id', paymentIntent.id)
            .single()

          if (!existingPayment) {
            // Insérer le paiement
            await supabase
              .from('payments')
              .insert({
                user_id: userId,
                amount: typeof paymentIntent.amount === 'number' ? paymentIntent.amount : 0, // centimes
                currency: paymentIntent.currency,
                status: paymentIntent.status,
                stripe_payment_intent_id: paymentIntent.id,
              })

            // Mettre à jour les crédits
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('credits')
              .eq('id', userId)
              .single()

            const currentCredits = profile?.credits || 0
            await supabase
              .from('user_profiles')
              .update({ credits: currentCredits + credits })
              .eq('id', userId)
          }
        } catch (error) {
          console.error('Erreur traitement payment_intent:', error)
        }
      }
    }

    res.json({ received: true })
  })

  return router
}
