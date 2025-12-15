# Guide de configuration Stripe pour ElectroMed

Ce guide explique comment configurer Stripe pour les paiements de packs de crédits.

## 📋 Prérequis

1. **Compte Stripe** créé (mode test ou production)
2. **Clés API Stripe** (Secret Key et Publishable Key)
3. **Webhook endpoint** configuré dans Stripe Dashboard

## 🔧 Configuration Backend

### 1. Variables d'environnement

Créez un fichier `.env` dans le dossier `backend/` :

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_KEY=eyJ...

# Frontend
FRONTEND_URL=http://localhost:5173

# Port
PORT=3000
```

### 2. Installer les dépendances

```bash
cd backend
npm install
```

### 3. Démarrer le serveur

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 🔗 Configuration Webhook Stripe

### 1. Développement Local (Recommandé : Stripe CLI)

**Option A : Stripe CLI (Plus simple)**

1. Installez [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Connectez-vous : `stripe login`
3. Forwardez les webhooks :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copiez le secret affiché (commence par `whsec_...`) dans votre `.env` :
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```
5. **Pas besoin** de créer un endpoint dans Stripe Dashboard en local !

**Option B : ngrok (Alternative)**

1. Installez [ngrok](https://ngrok.com/download)
2. Créez un tunnel : `ngrok http 3000`
3. Utilisez l'URL affichée (ex: `https://abc123.ngrok.io`) dans Stripe Dashboard
4. URL webhook : `https://abc123.ngrok.io/api/webhooks/stripe`

### 2. Production

1. Déployez votre backend (ex: `https://electromed-api.herokuapp.com`)
2. Allez dans [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
3. Cliquez sur "Add endpoint"
4. URL : `https://electromed-api.herokuapp.com/api/webhooks/stripe`
5. Événements à écouter :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
6. Copiez le "Signing secret" dans les variables d'environnement de votre service

> 📖 **Voir le guide détaillé** : `docs/STRIPE_WEBHOOK_URL.md`

## 🎨 Configuration Frontend

### 1. Variables d'environnement

Le frontend n'a pas besoin de variables Stripe directement, mais vérifiez que `.env.local` contient :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

### 2. URL du backend

Assurez-vous que l'URL du backend dans `src/pages/Credits.tsx` correspond à votre environnement :

```typescript
const response = await fetch('http://localhost:3000/api/create-checkout-session', {
  // ...
})
```

Pour la production, remplacez par l'URL de votre backend déployé.

## 📊 Packs de crédits

Les packs sont définis dans `backend/routes/checkout.js` :

```javascript
const PACKS = {
  pack_5: { name: 'Pack Découverte', credits: 5, price: 99 },
  pack_10: { name: 'Pack Standard', credits: 10, price: 179 },
  pack_20: { name: 'Pack Premium', credits: 20, price: 329 },
}
```

Pour modifier les prix ou ajouter des packs, éditez ce fichier.

## 🔒 Sécurité

### Vérification des webhooks

Le webhook vérifie automatiquement la signature Stripe pour s'assurer que la requête provient bien de Stripe.

### Gestion des erreurs

- Les erreurs sont loggées dans la console du serveur
- Les utilisateurs voient des messages d'erreur clairs
- Les paiements échoués ne créditent pas l'utilisateur

## 🧪 Tests

### Mode test Stripe

Utilisez les cartes de test Stripe :

- **Succès** : `4242 4242 4242 4242`
- **Échec** : `4000 0000 0000 0002`
- **3D Secure** : `4000 0025 0000 3155`

Date d'expiration : n'importe quelle date future
CVC : n'importe quel 3 chiffres

### Tester le flux complet

1. Connectez-vous avec un compte utilisateur
2. Allez sur `/dashboard/credits`
3. Cliquez sur "Acheter maintenant" pour un pack
4. Utilisez une carte de test Stripe
5. Vérifiez que les crédits sont bien ajoutés après le paiement

## 🚀 Déploiement

### Backend

1. Déployez le backend sur votre serveur (Heroku, Railway, etc.)
2. Configurez les variables d'environnement
3. Mettez à jour l'URL du webhook dans Stripe Dashboard

### Frontend

1. Mettez à jour l'URL du backend dans `src/pages/Credits.tsx`
2. Déployez le frontend
3. Testez le flux de paiement en production

## 📝 Notes importantes

- Les crédits sont ajoutés **automatiquement** après un paiement réussi
- Le webhook peut prendre quelques secondes à se déclencher
- En cas d'échec du webhook, contactez le support pour créditer manuellement
- Les paiements sont enregistrés dans la table `payments` de Supabase

## 🐛 Dépannage

### Le webhook ne se déclenche pas

- Vérifiez que l'URL est correcte dans Stripe Dashboard
- Vérifiez que le secret webhook est correct dans `.env`
- Vérifiez les logs du serveur backend

### Les crédits ne sont pas ajoutés

- Vérifiez les logs du webhook dans Stripe Dashboard
- Vérifiez les logs du serveur backend
- Vérifiez que la table `user_profiles` est accessible avec la service key

### Erreur "Invalid signature"

- Vérifiez que vous utilisez le bon secret webhook
- Vérifiez que le body de la requête n'est pas modifié (raw body requis)

