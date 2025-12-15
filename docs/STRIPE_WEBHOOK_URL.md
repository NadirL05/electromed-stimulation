# Configuration de l'URL Webhook Stripe

## 🔍 Quelle URL utiliser ?

L'URL `https://votre-domaine.com/api/webhooks/stripe` est un **placeholder**. Vous devez la remplacer par votre vraie URL selon votre environnement.

## 🏠 Développement Local

### Option 1 : Stripe CLI (Recommandé)

1. **Installer Stripe CLI** :
   ```bash
   # Windows (avec Chocolatey)
   choco install stripe
   
   # Ou télécharger depuis https://stripe.com/docs/stripe-cli
   ```

2. **Se connecter à Stripe** :
   ```bash
   stripe login
   ```

3. **Forwarder les webhooks vers votre serveur local** :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Récupérer le secret webhook** :
   - Stripe CLI affichera quelque chose comme : `whsec_xxxxxxxxxxxxx`
   - Copiez cette valeur dans votre `.env` backend :
     ```env
     STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
     ```

5. **Dans Stripe Dashboard** :
   - Vous n'avez **pas besoin** de créer un endpoint webhook
   - Stripe CLI gère tout automatiquement

### Option 2 : ngrok (Alternative)

1. **Installer ngrok** :
   ```bash
   # Télécharger depuis https://ngrok.com/download
   ```

2. **Démarrer votre serveur backend** :
   ```bash
   cd backend
   npm run dev
   # Serveur sur http://localhost:3000
   ```

3. **Créer un tunnel ngrok** :
   ```bash
   ngrok http 3000
   ```

4. **Récupérer l'URL** :
   - ngrok affichera quelque chose comme : `https://abc123.ngrok.io`
   - Votre URL webhook sera : `https://abc123.ngrok.io/api/webhooks/stripe`

5. **Configurer dans Stripe Dashboard** :
   - Allez sur https://dashboard.stripe.com/test/webhooks
   - Cliquez sur "Add endpoint"
   - URL : `https://abc123.ngrok.io/api/webhooks/stripe`
   - Événements : `checkout.session.completed`, `payment_intent.succeeded`
   - Copiez le "Signing secret" dans votre `.env`

## 🚀 Production

### Si vous déployez sur un service (Heroku, Railway, etc.)

1. **Déployez votre backend** :
   - Exemple : `https://electromed-backend.herokuapp.com`

2. **Votre URL webhook sera** :
   ```
   https://electromed-backend.herokuapp.com/api/webhooks/stripe
   ```

3. **Configurer dans Stripe Dashboard** :
   - Allez sur https://dashboard.stripe.com/webhooks (mode production)
   - Cliquez sur "Add endpoint"
   - URL : `https://electromed-backend.herokuapp.com/api/webhooks/stripe`
   - Événements : `checkout.session.completed`, `payment_intent.succeeded`
   - Copiez le "Signing secret" dans les variables d'environnement de votre service

### Si vous avez votre propre serveur

1. **Votre URL webhook sera** :
   ```
   https://votre-domaine.com/api/webhooks/stripe
   ```
   (Remplacez `votre-domaine.com` par votre vrai domaine)

2. **Assurez-vous que** :
   - Le serveur est accessible publiquement
   - HTTPS est configuré (Stripe exige HTTPS)
   - Le port 443 (HTTPS) est ouvert

## 📝 Exemple concret

### Pour le développement local avec Stripe CLI :

```bash
# Terminal 1 : Démarrer le backend
cd backend
npm run dev

# Terminal 2 : Forwarder les webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Résultat** :
- Votre backend écoute sur `http://localhost:3000`
- Stripe CLI forward les webhooks vers `localhost:3000/api/webhooks/stripe`
- Pas besoin de configurer dans Stripe Dashboard
- Utilisez le secret affiché par Stripe CLI dans votre `.env`

### Pour la production (exemple Heroku) :

1. **Backend déployé sur** : `https://electromed-api.herokuapp.com`
2. **URL webhook** : `https://electromed-api.herokuapp.com/api/webhooks/stripe`
3. **Dans Stripe Dashboard** :
   - Endpoint URL : `https://electromed-api.herokuapp.com/api/webhooks/stripe`
   - Signing secret : `whsec_...` (à mettre dans les config vars Heroku)

## ✅ Vérification

Pour vérifier que votre webhook fonctionne :

1. **Testez un paiement** avec une carte de test Stripe
2. **Vérifiez les logs** de votre backend
3. **Vérifiez dans Stripe Dashboard** → Webhooks → Votre endpoint → "Recent events"

Vous devriez voir les événements `checkout.session.completed` apparaître.

## 🐛 Problèmes courants

### "Invalid signature"
- Vérifiez que le `STRIPE_WEBHOOK_SECRET` est correct
- En développement avec Stripe CLI, utilisez le secret affiché par la CLI (pas celui du Dashboard)

### "Webhook not received"
- Vérifiez que votre serveur est accessible publiquement (pas localhost en production)
- Vérifiez que l'URL est correcte dans Stripe Dashboard
- Vérifiez que votre serveur écoute bien sur le port configuré

### "Connection refused"
- Vérifiez que votre backend est bien démarré
- Vérifiez que le port est correct (3000 par défaut)
- Vérifiez votre firewall

