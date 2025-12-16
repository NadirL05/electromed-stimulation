# 🚂 Guide de Déploiement Railway - ElectroMed

Ce guide vous explique comment déployer **frontend ET backend** sur Railway et les connecter ensemble.

## 📋 Prérequis

- Un compte Railway ([railway.app](https://railway.app))
- Votre projet ElectroMed pusHé sur GitHub
- Les credentials Supabase et Stripe (déjà configurés localement)

## 🎯 Architecture de Déploiement

```
┌─────────────────────────────────────────────────┐
│              Railway Project                     │
│                                                  │
│  ┌──────────────────┐    ┌──────────────────┐  │
│  │  Backend Service │◄───┤ Frontend Service │  │
│  │   (Port 3000)    │    │  (Vite Preview)  │  │
│  └────────┬─────────┘    └──────────────────┘  │
│           │                                      │
└───────────┼──────────────────────────────────────┘
            │
            ▼
    ┌──────────────┐
    │   Supabase   │
    │   + Stripe   │
    └──────────────┘
```

## 📦 Étape 1 : Créer le Projet Railway

### 1.1 Connexion à Railway

1. Allez sur [railway.app](https://railway.app)
2. Cliquez sur **"Start a New Project"**
3. Sélectionnez **"Deploy from GitHub repo"**
4. Choisissez votre repository **NadirL05/electromed-stimulation**
5. Railway va créer un projet vide

### 1.2 Structure du Projet

Railway va détecter automatiquement que vous avez :
- Un frontend (React + Vite) à la racine
- Un backend (Node.js Express) dans le dossier `backend/`

## 🔧 Étape 2 : Déployer le Backend

### 2.1 Créer le Service Backend

1. Dans votre projet Railway, cliquez sur **"+ New"**
2. Sélectionnez **"GitHub Repo"**
3. Choisissez votre repo **electromed-stimulation**
4. Railway va créer un nouveau service

### 2.2 Configurer le Backend

1. Cliquez sur le service créé
2. Allez dans **Settings** > **General**
3. Nommez le service : **"electromed-backend"**
4. Dans **Root Directory**, entrez : **`backend`**
5. Dans **Start Command**, entrez : **`npm run dev`**
6. Dans **Build Command**, laissez vide (pas de build pour le backend)

### 2.3 Ajouter les Variables d'Environnement du Backend

1. Dans le service backend, allez dans **Variables**
2. Cliquez sur **"+ New Variable"** et ajoutez :

```bash
# Stripe Configuration
# ⚠️ IMPORTANT: Remplacez par VOS clés Stripe depuis https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_SECRETE_STRIPE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET

# Supabase Configuration
SUPABASE_URL=https://cxcdfurwsefllhxucjnz.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2RmdXJ3c2VmbGxoeHVjam56Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTgzMTU1MCwiZXhwIjoyMDY1NDA3NTUwfQ.LrNHy423pNKtfWvExb2zSp2d8SglQwAayl9F6y_hrjU

# Server Configuration
PORT=3000
FRONTEND_URL=${{RAILWAY_PUBLIC_DOMAIN_FRONTEND}}
```

⚠️ **Important** : Pour `FRONTEND_URL`, nous allons la modifier plus tard avec l'URL du frontend.

### 2.4 Générer le Domaine Public du Backend

1. Dans le service backend, allez dans **Settings**
2. Cliquez sur **"Generate Domain"**
3. Railway va créer une URL comme : `https://electromed-backend-production.up.railway.app`
4. **Copiez cette URL** - vous en aurez besoin pour le frontend !

### 2.5 Vérifier le Déploiement du Backend

1. Allez dans **Deployments**
2. Attendez que le build soit terminé (indicateur vert)
3. Testez l'API : `https://votre-backend-url.railway.app/health`
4. Vous devriez voir : `{"status":"ok"}`

## 🎨 Étape 3 : Déployer le Frontend

### 3.1 Créer le Service Frontend

1. Dans votre projet Railway, cliquez sur **"+ New"**
2. Sélectionnez **"GitHub Repo"**
3. Choisissez le même repo **electromed-stimulation**
4. Railway va créer un second service

### 3.2 Configurer le Frontend

1. Cliquez sur le nouveau service
2. Allez dans **Settings** > **General**
3. Nommez le service : **"electromed-frontend"**
4. Dans **Root Directory**, laissez vide (frontend est à la racine)
5. Dans **Build Command**, entrez : **`npm install && npm run build`**
6. Dans **Start Command**, entrez : **`npm run start`**

### 3.3 Ajouter les Variables d'Environnement du Frontend

1. Dans le service frontend, allez dans **Variables**
2. Ajoutez les variables suivantes :

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://cxcdfurwsefllhxucjnz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2RmdXJ3c2VmbGxoeHVjam56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MzE1NTAsImV4cCI6MjA2NTQwNzU1MH0.7N280pwCrxSuWY1_fJhicTLKVGgYnnRWp9T14edhyJM

# Backend API URL - REMPLACEZ PAR L'URL DE VOTRE BACKEND
VITE_API_URL=https://votre-backend-url.railway.app

# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_test_51SbyzCR10ndhFPOHrWjELiV8bf3FmBJHiYpRuGu6vOc6PQzuKh5FYCC7DWmxxQsVOS9AIBnHR3T9ELX3JHHCFMp900PqvPjtzD
```

⚠️ **IMPORTANT** : Remplacez `https://votre-backend-url.railway.app` par l'URL réelle du backend (étape 2.4)

### 3.4 Générer le Domaine Public du Frontend

1. Dans le service frontend, allez dans **Settings**
2. Cliquez sur **"Generate Domain"**
3. Railway va créer une URL comme : `https://electromed-frontend-production.up.railway.app`
4. **C'est cette URL que vous utiliserez pour accéder à votre application !**

### 3.5 Vérifier le Déploiement du Frontend

1. Allez dans **Deployments**
2. Attendez que le build soit terminé
3. Ouvrez l'URL du frontend : `https://votre-frontend-url.railway.app`
4. Vous devriez voir votre magnifique application ElectroMed ! 🎉

## 🔗 Étape 4 : Connecter Frontend et Backend

### 4.1 Mettre à Jour FRONTEND_URL dans le Backend

1. Retournez au service **backend**
2. Allez dans **Variables**
3. Modifiez la variable `FRONTEND_URL` avec l'URL du frontend :
   ```
   FRONTEND_URL=https://votre-frontend-url.railway.app
   ```
4. Railway va automatiquement redéployer le backend

### 4.2 Mettre à Jour VITE_API_URL dans le Frontend

Si ce n'est pas déjà fait :

1. Allez au service **frontend**
2. Allez dans **Variables**
3. Vérifiez que `VITE_API_URL` pointe vers l'URL du backend
4. Si vous avez modifié, Railway va redéployer

### 4.3 Tester la Connexion

1. Ouvrez votre frontend : `https://votre-frontend-url.railway.app`
2. Ouvrez la console du navigateur (F12)
3. Essayez de créer un compte
4. Vérifiez qu'il n'y a pas d'erreurs CORS
5. Le backend devrait accepter les requêtes du frontend

## ✅ Étape 5 : Vérification Finale

### 5.1 Checklist de Déploiement

- [ ] Backend déployé et accessible sur `/health`
- [ ] Frontend déployé et affiche l'interface
- [ ] Connexion à Supabase fonctionne (créer un compte)
- [ ] Pas d'erreurs CORS dans la console
- [ ] Design s'affiche correctement (thème clair)
- [ ] Les images et assets se chargent

### 5.2 URLs à Noter

Notez vos URLs dans un endroit sûr :

```
Frontend : https://votre-frontend.up.railway.app
Backend  : https://votre-backend.up.railway.app
Supabase : https://cxcdfurwsefllhxucjnz.supabase.co
```

## 🐛 Résolution de Problèmes

### Erreur CORS

Si vous voyez des erreurs CORS :

1. Vérifiez que `FRONTEND_URL` dans le backend contient l'URL correcte
2. Le backend utilise `cors({ origin: process.env.FRONTEND_URL || '*' })`
3. Redéployez le backend après modification

### Erreur 404 sur les Routes

Le frontend est une SPA (Single Page Application) :

1. Dans Railway, allez dans **Settings** du frontend
2. Ajoutez dans **Custom Start Command** :
   ```bash
   npm run start
   ```
3. Vite preview gère correctement le routing SPA

### Variables d'Environnement ne se Chargent Pas

Les variables `VITE_*` doivent être définies **AVANT** le build :

1. Vérifiez que toutes les variables `VITE_*` sont dans Railway
2. Redéclenchez un nouveau déploiement : Settings > Deployments > Redeploy

### Le Backend ne Démarre Pas

Vérifiez les logs :

1. Allez dans **Deployments** > Cliquez sur le dernier déploiement
2. Regardez les **Logs**
3. Vérifiez que toutes les variables d'env sont définies

## 🎉 Vous avez Terminé !

Votre application ElectroMed est maintenant déployée sur Railway avec :

✅ **Frontend React** : Interface moderne et responsive
✅ **Backend Express** : API pour les paiements Stripe
✅ **Base de données Supabase** : Authentification et stockage
✅ **Stripe** : Système de paiement configuré

### Prochaines Étapes

1. **Configurez un domaine personnalisé** dans Railway Settings
2. **Testez toutes les fonctionnalités** (inscription, connexion, etc.)
3. **Configurez les webhooks Stripe** avec votre URL Railway
4. **Activez les logs** pour monitorer les erreurs

Besoin d'aide ? Consultez :
- [Documentation Railway](https://docs.railway.app)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Stripe](https://stripe.com/docs)

Bon déploiement ! 🚀
