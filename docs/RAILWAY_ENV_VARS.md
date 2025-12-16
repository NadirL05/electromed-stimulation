# 🔐 Variables d'Environnement pour Railway

Ce fichier contient toutes les variables d'environnement à configurer dans Railway.

## 📦 Backend Service

Copiez-collez ces variables dans Railway > Backend Service > Variables :

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
FRONTEND_URL=https://VOTRE-FRONTEND-URL.railway.app
```

⚠️ **À faire après avoir déployé le frontend :**
- Remplacez `VOTRE-FRONTEND-URL` par l'URL réelle de votre frontend Railway

---

## 🎨 Frontend Service

Copiez-collez ces variables dans Railway > Frontend Service > Variables :

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://cxcdfurwsefllhxucjnz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2RmdXJ3c2VmbGxoeHVjam56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MzE1NTAsImV4cCI6MjA2NTQwNzU1MH0.7N280pwCrxSuWY1_fJhicTLKVGgYnnRWp9T14edhyJM

# Backend API URL
VITE_API_URL=https://VOTRE-BACKEND-URL.railway.app

# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_test_51SbyzCR10ndhFPOHrWjELiV8bf3FmBJHiYpRuGu6vOc6PQzuKh5FYCC7DWmxxQsVOS9AIBnHR3T9ELX3JHHCFMp900PqvPjtzD
```

⚠️ **À faire après avoir déployé le backend :**
- Remplacez `VOTRE-BACKEND-URL` par l'URL réelle de votre backend Railway

---

## 📋 Ordre de Déploiement Recommandé

1. **Déployez le Backend en premier**
   - Créez le service backend dans Railway
   - Ajoutez toutes les variables ci-dessus
   - Générez le domaine public
   - Notez l'URL : `https://xxx.railway.app`

2. **Déployez le Frontend ensuite**
   - Créez le service frontend dans Railway
   - Ajoutez les variables ci-dessus
   - **Remplacez** `VITE_API_URL` par l'URL du backend
   - Générez le domaine public

3. **Mettez à jour FRONTEND_URL dans le Backend**
   - Retournez au backend
   - Modifiez `FRONTEND_URL` avec l'URL du frontend
   - Railway redéploiera automatiquement

---

## 🔍 Vérification

Après déploiement, vérifiez :

✅ **Backend** : `https://votre-backend.railway.app/health` → `{"status":"ok"}`
✅ **Frontend** : `https://votre-frontend.railway.app` → Interface ElectroMed
✅ **Connexion** : Pas d'erreurs CORS dans la console du navigateur

---

## 🛡️ Sécurité

⚠️ **IMPORTANT** :
- Ne commitez JAMAIS ces variables dans Git
- Les fichiers `.env` sont déjà dans `.gitignore`
- Utilisez uniquement l'interface Railway pour les variables sensibles
- `SUPABASE_SERVICE_KEY` est particulièrement sensible !

---

Consultez `docs/RAILWAY_DEPLOYMENT.md` pour le guide complet étape par étape !
