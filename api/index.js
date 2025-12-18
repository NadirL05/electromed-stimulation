import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import dotenv from 'dotenv'
import checkoutRoutes from '../backend/routes/checkout.js'
import webhookRoutes from '../backend/routes/webhooks.js'

// Charger les variables d'environnement
dotenv.config()

const app = express()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})

// Webhook doit recevoir le raw body
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }))
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

app.use('/api', checkoutRoutes(stripe))
app.use('/api/webhooks', webhookRoutes(stripe))
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Export pour Vercel serverless
export default app
