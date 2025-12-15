import { Router } from 'express'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Charger le fichier .env depuis le dossier backend
dotenv.config({ path: join(__dirname, '..', '.env') })

const PACKS = {
  pack_5: { name: 'Pack Découverte', credits: 5, price: 99 },
  pack_10: { name: 'Pack Standard', credits: 10, price: 179 },
  pack_20: { name: 'Pack Premium', credits: 20, price: 329 },
}

export default function checkoutRoutes(stripe) {
  const router = Router()

  router.post('/create-checkout-session', async (req, res) => {
    try {
      const { packId, userId, successUrl, cancelUrl, subscriptionId } = req.body
      const pack = PACKS[packId]
      if (!pack) {
        return res.status(400).json({ error: 'Pack invalide' })
      }
      if (!userId) {
        return res.status(400).json({ error: 'Utilisateur manquant' })
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: { name: pack.name },
              unit_amount: pack.price * 100,
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId,
          packId,
          credits: String(pack.credits),
          subscriptionId: subscriptionId ?? '',
        },
      })

      return res.json({ url: session.url })
    } catch (error) {
      console.error('Stripe checkout error:', error)
      return res.status(500).json({ error: 'Erreur création session' })
    }
  })

  return router
}

