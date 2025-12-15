import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import checkoutRoutes from './routes/checkout.js'
import webhookRoutes from './routes/webhooks.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Charger le fichier .env depuis le dossier backend
dotenv.config({ path: join(__dirname, '.env') })

// Vérifier les variables d'environnement critiques
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY manquante dans .env')
  process.exit(1)
}

const app = express()
const port = process.env.PORT || 3000
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})

// Webhook doit recevoir le raw body
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }))
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

app.use('/api', checkoutRoutes(stripe))
app.use('/api/webhooks', webhookRoutes(stripe))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(port, () => {
  console.log(`Server running on :${port}`)
})

