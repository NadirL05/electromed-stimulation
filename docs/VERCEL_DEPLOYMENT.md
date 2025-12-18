# 🚀 Guide de Déploiement sur Vercel

Ce guide vous explique comment déployer ElectroMed sur Vercel étape par étape.

## 📋 Prérequis

- Un compte GitHub avec votre code
- Un compte Vercel (gratuit) : [vercel.com](https://vercel.com)
- Un projet Supabase configuré

## 🎯 Méthode 1 : Déploiement via l'Interface Web (Recommandé)

### Étape 1 : Connecter votre Repository

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous
2. Cliquez sur **"Add New..."** puis **"Project"**
3. Importez votre repository GitHub
4. Si votre repo n'apparaît pas, cliquez sur **"Adjust GitHub App Permissions"** et autorisez l'accès

### Étape 2 : Configurer le Projet

Vercel détecte automatiquement Vite, mais vérifiez ces paramètres :

- **Framework Preset** : `Vite` (détecté automatiquement)
- **Root Directory** : `./` (racine du projet)
- **Build Command** : `npm run build` (automatique)
- **Output Directory** : `dist` (automatique)
- **Install Command** : `npm ci` (automatique)

### Étape 3 : Configurer les Variables d'Environnement

Avant de déployer, ajoutez vos variables d'environnement :

1. Dans la section **"Environment Variables"**, cliquez sur **"Add"**
2. Ajoutez les variables suivantes :

| Variable | Valeur | Où trouver |
|----------|--------|------------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Dashboard Supabase > Settings > API > Project URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Dashboard Supabase > Settings > API > anon/public key |

⚠️ **Important** :
- Les variables doivent commencer par `VITE_` pour être accessibles dans le code client
- Ne partagez jamais vos clés publiquement
- Utilisez des valeurs différentes pour Production, Preview et Development si nécessaire

### Étape 4 : Déployer

1. Cliquez sur **"Deploy"**
2. Attendez que le build se termine (environ 1-2 minutes)
3. Votre application sera disponible sur une URL comme : `https://votre-projet.vercel.app`

### Étape 5 : Configurer un Domaine Personnalisé (Optionnel)

1. Allez dans **Settings > Domains**
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer les DNS

---

## 🛠️ Méthode 2 : Déploiement via CLI

### Installation

```bash
# Installez Vercel CLI globalement
npm install -g vercel
```

### Première Déploiement

```bash
# Connectez-vous à Vercel
vercel login

# Dans le répertoire de votre projet
cd "C:\Users\nadir\Documents\SaaS ElectroMed"

# Déployez (mode preview)
vercel

# Suivez les instructions :
# - Set up and deploy? Y
# - Which scope? (votre compte)
# - Link to existing project? N (première fois)
# - Project name? electromed (ou votre choix)
# - Directory? ./
# - Override settings? N
```

### Déploiement en Production

```bash
# Déployez en production
vercel --prod
```

### Configuration des Variables d'Environnement via CLI

```bash
# Ajouter une variable pour tous les environnements
vercel env add VITE_SUPABASE_URL

# Ajouter une variable pour la production uniquement
vercel env add VITE_SUPABASE_URL production

# Lister les variables
vercel env ls

# Supprimer une variable
vercel env rm VITE_SUPABASE_URL
```

---

## 🔧 Configuration du Fichier vercel.json

Le fichier `vercel.json` est déjà configuré avec :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Cette configuration :
- ✅ Spécifie la commande de build
- ✅ Indique le dossier de sortie
- ✅ Configure le routing SPA (toutes les routes redirigent vers `/index.html`)
- ✅ Optimise le cache des assets statiques

---

## 🔄 Déploiement Automatique

Vercel déploie automatiquement votre application à chaque push sur :
- **Production** : Branche `main` ou `master`
- **Preview** : Toutes les autres branches et Pull Requests

### Workflow Recommandé

1. **Développement** : Travaillez sur une branche `feature/xxx`
2. **Preview** : Vercel crée automatiquement une URL de preview pour tester
3. **Production** : Mergez sur `main` → Déploiement automatique en production

---

## 🐛 Résolution de Problèmes

### Le build échoue

1. **Vérifiez les logs** : Allez dans votre projet > Deployments > Cliquez sur le déploiement échoué
2. **Vérifiez les variables d'environnement** : Assurez-vous qu'elles sont bien configurées
3. **Testez en local** : Lancez `npm run build` localement pour identifier les erreurs

### Les styles ne s'affichent pas

1. Vérifiez que Tailwind CSS est bien installé : `npm list tailwindcss`
2. Vérifiez que `postcss.config.js` est présent
3. Vérifiez que `src/index.css` importe Tailwind : `@import 'tailwindcss';`

### Erreur 404 sur les routes

1. Vérifiez que `vercel.json` contient la configuration de rewrites
2. Assurez-vous que toutes les routes redirigent vers `/index.html`

### Variables d'environnement non disponibles

1. Vérifiez que les variables commencent par `VITE_`
2. Redéployez après avoir ajouté/modifié des variables
3. Vérifiez que vous avez sélectionné le bon environnement (Production/Preview/Development)

---

## 📊 Monitoring et Analytics

Vercel fournit gratuitement :
- **Analytics** : Nombre de visiteurs, pages vues, etc.
- **Speed Insights** : Performance de votre application
- **Logs** : Logs en temps réel de votre application

Accédez-y via votre dashboard Vercel > Votre projet > Analytics/Speed Insights/Logs

---

## 🔐 Sécurité

### Bonnes Pratiques

1. **Ne commitez jamais** vos fichiers `.env` ou `.env.local`
2. **Utilisez des variables d'environnement** pour toutes les clés sensibles
3. **Activez 2FA** sur votre compte Vercel
4. **Limitez l'accès** à votre projet Vercel aux membres de confiance

### Variables Sensibles

Les variables commençant par `VITE_` sont exposées au client. Ne mettez jamais :
- ❌ Clés secrètes (service role keys)
- ❌ Tokens d'API privés
- ❌ Mots de passe

Utilisez uniquement :
- ✅ Clés publiques (anon keys)
- ✅ URLs publiques
- ✅ Configuration non-sensible

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Guide Vite sur Vercel](https://vercel.com/docs/frameworks/vite)
- [Variables d'environnement Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Support Vercel](https://vercel.com/support)

---

## ✅ Checklist de Déploiement

- [ ] Repository GitHub connecté
- [ ] Variables d'environnement configurées (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- [ ] Build réussi en local (`npm run build`)
- [ ] Fichier `vercel.json` présent
- [ ] Application déployée et accessible
- [ ] Routes fonctionnent correctement (pas d'erreur 404)
- [ ] Styles CSS s'affichent correctement
- [ ] Connexion Supabase fonctionne

---

**Besoin d'aide ?** Consultez les [logs Vercel](https://vercel.com/docs/concepts/projects/logs) ou le [support Vercel](https://vercel.com/support).

