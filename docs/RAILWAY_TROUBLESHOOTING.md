# 🔧 Railway Troubleshooting - "npm: command not found"

Si vous voyez l'erreur **"npm: command not found"** lors du déploiement Railway, suivez ce guide.

## 🎯 Solution Rapide

Railway détectera automatiquement les **Dockerfiles** (ajoutés dans le dernier commit) et utilisera Docker au lieu de Nixpacks. Cela devrait résoudre le problème.

### Étapes à suivre :

1. **Dans Railway, allez dans votre service qui échoue**
2. **Cliquez sur Settings**
3. **Vérifiez la configuration** :

---

## ✅ Configuration Correcte pour le FRONTEND

### Settings à vérifier :

- **Service Name** : `electromed-frontend` (ou au choix)
- **Root Directory** : **Laissez VIDE** ou `/`
- **Build Command** : **Laissez VIDE** (Docker s'en charge)
- **Start Command** : **Laissez VIDE** (Docker s'en charge)
- **Builder** : Devrait dire **"Dockerfile"** après le prochain déploiement

### Variables requises :

```bash
VITE_SUPABASE_URL=https://cxcdfurwsefllhxucjnz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2RmdXJ3c2VmbGxoeHVjam56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MzE1NTAsImV4cCI6MjA2NTQwNzU1MH0.7N280pwCrxSuWY1_fJhicTLKVGgYnnRWp9T14edhyJM
VITE_API_URL=https://VOTRE-BACKEND-URL.railway.app
VITE_STRIPE_PUBLIC_KEY=pk_test_51SbyzCR10ndhFPOHrWjELiV8bf3FmBJHiYpRuGu6vOc6PQzuKh5FYCC7DWmxxQsVOS9AIBnHR3T9ELX3JHHCFMp900PqvPjtzD
```

---

## ✅ Configuration Correcte pour le BACKEND

### Settings à vérifier :

- **Service Name** : `electromed-backend` (ou au choix)
- **Root Directory** : **`/backend`** ← IMPORTANT !
- **Build Command** : **Laissez VIDE** (Docker s'en charge)
- **Start Command** : **Laissez VIDE** (Docker s'en charge)
- **Builder** : Devrait dire **"Dockerfile"** après le prochain déploiement

### Variables requises :

```bash
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_STRIPE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK
SUPABASE_URL=https://cxcdfurwsefllhxucjnz.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Y2RmdXJ3c2VmbGxoeHVjam56Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTgzMTU1MCwiZXhwIjoyMDY1NDA3NTUwfQ.LrNHy423pNKtfWvExb2zSp2d8SglQwAayl9F6y_hrjU
PORT=3000
FRONTEND_URL=https://VOTRE-FRONTEND-URL.railway.app
```

---

## 🔄 Forcer le Redéploiement

Après avoir vérifié/corrigé la configuration :

1. **Allez dans Deployments**
2. **Cliquez sur les 3 points** `...` en haut à droite
3. **Sélectionnez "Redeploy"**
4. Railway va maintenant utiliser le **Dockerfile**

---

## 🐛 Erreurs Communes

### 1. "Unexposed service"

**Problème** : Le service n'expose pas de port

**Solution** :
- Allez dans **Settings** > **Networking**
- Cliquez sur **"Generate Domain"**
- Railway va automatiquement exposer le port

### 2. "Root directory '/backend' not found" (Backend)

**Problème** : Le root directory n'est pas configuré pour le backend

**Solution** :
- Settings > **Root Directory** : Mettez `/backend`
- Sauvegardez et redéployez

### 3. "Cannot find module 'xxx'"

**Problème** : Les dépendances ne sont pas installées

**Solution** :
- Le Dockerfile installe automatiquement avec `npm ci`
- Si l'erreur persiste, vérifiez que `package-lock.json` existe
- Supprimez les **Build/Start Commands** custom dans Settings

### 4. Le build passe mais l'app ne démarre pas

**Problème** : Variable `$PORT` non configurée

**Solution** :
- Railway injecte automatiquement `$PORT`
- Vérifiez que votre app utilise `process.env.PORT`
- Le Dockerfile définit déjà les ports corrects

---

## 📊 Ordre de Déploiement Recommandé

1. **Déployez le BACKEND d'abord**
   - Créez le service
   - Configurez Root Directory = `/backend`
   - Ajoutez les variables
   - Générez le domaine public
   - **Notez l'URL** (ex: `https://backend-xxx.railway.app`)

2. **Déployez le FRONTEND ensuite**
   - Créez le service
   - Root Directory vide
   - Ajoutez les variables
   - **Dans `VITE_API_URL`** : Mettez l'URL du backend
   - Générez le domaine public

3. **Mettez à jour `FRONTEND_URL` dans le Backend**
   - Retournez au backend
   - Variables > `FRONTEND_URL` = URL du frontend
   - Railway redéploie automatiquement

---

## 🎯 Vérification Finale

Une fois déployé avec succès :

✅ **Backend** : `https://votre-backend.railway.app/health` → `{"status":"ok"}`
✅ **Frontend** : `https://votre-frontend.railway.app` → Interface ElectroMed
✅ **Pas d'erreurs CORS** dans la console du navigateur

---

## 💡 Alternative : Forcer Docker Builder

Si Railway utilise toujours Nixpacks malgré le Dockerfile :

1. **Dans Settings > Build**
2. **Watch Paths** : Ajoutez `/Dockerfile`
3. Railway détectera le Dockerfile au prochain déploiement

---

## 📞 Besoin d'Aide ?

Si le problème persiste :

1. **Vérifiez les logs** : Deployments > Cliquez sur le déploiement > View Logs
2. **Partagez l'erreur exacte** que vous voyez
3. **Vérifiez** que vous avez bien 2 services séparés (frontend + backend)

Railway devrait maintenant utiliser Docker et le déploiement devrait réussir ! 🚀
