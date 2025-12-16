# 🚀 Guide de Configuration ElectroMed

Ce guide vous explique comment configurer et connecter le frontend React et le backend Express de l'application ElectroMed.

## 📋 Prérequis

- Node.js 18+ et npm
- Un compte Supabase (gratuit)
- Un compte Stripe (gratuit en mode test)
- 2 terminaux ouverts

## 🎯 Architecture de l'application

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  Frontend React │ ◄─────► │ Backend Express │ ◄─────► │    Supabase     │
│   (Port 5173)   │         │   (Port 3000)   │         │   (Database)    │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │                            │
        │                            │
        └────────────────┬───────────┘
                         │
                         ▼
                 ┌─────────────┐
                 │   Stripe    │
                 │  (Payments) │
                 └─────────────┘
```

## 🔧 Étape 1 : Configuration de Supabase

### 1.1 Créer un projet Supabase

1. Va sur [https://supabase.com](https://supabase.com)
2. Clique sur "Start your project"
3. Crée un nouveau projet :
   - Nom : `electromed-saas`
   - Database Password : Note-le dans un endroit sûr
   - Region : Choisis la plus proche de toi

### 1.2 Récupérer les credentials

Une fois le projet créé (ça prend ~2 minutes) :

1. Va dans **Settings** > **API**
2. Tu verras plusieurs informations :

```
Project URL : https://xxxxx.supabase.co
anon public : eyJhbGc.... (clé publique/anonyme)
service_role : eyJhbGc.... (⚠️ clé secrète - ne JAMAIS partager)
```

3. **Copie ces 3 valeurs**, tu en auras besoin plus tard

### 1.3 Créer les tables de base de données

Va dans **SQL Editor** et exécute le script suivant :

```sql
-- Table des utilisateurs (profils)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'coach', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des coachs
CREATE TABLE coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  specialties TEXT[],
  availability JSONB,
  franchise_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des crédits
CREATE TABLE credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  coach_id UUID REFERENCES coaches(id),
  service_type TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Policies de base
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

## 💳 Étape 2 : Configuration de Stripe

### 2.1 Créer un compte Stripe

1. Va sur [https://stripe.com](https://stripe.com)
2. Crée un compte gratuit
3. Active le **mode Test** (switch en haut à droite)

### 2.2 Récupérer les clés API

1. Va dans **Developers** > **API keys**
2. Tu verras 2 clés en mode test :

```
Publishable key : pk_test_51xxxxx (clé publique)
Secret key : sk_test_51xxxxx (clé secrète)
```

3. **Copie ces 2 clés**

### 2.3 Configurer les webhooks (optionnel pour l'instant)

Pour recevoir les notifications de paiement :

1. Va dans **Developers** > **Webhooks**
2. Clique sur "Add endpoint"
3. URL du webhook : `http://localhost:3000/api/webhooks/stripe`
4. Événements à écouter : `checkout.session.completed`
5. Copie le **Signing secret** (whsec_xxx)

## ⚙️ Étape 3 : Configuration du Frontend

### 3.1 Créer le fichier .env

Dans le dossier racine du projet :

```bash
# Copie le fichier d'exemple
cp .env.example .env
```

### 3.2 Éditer le fichier .env

Ouvre le fichier `.env` et remplace les valeurs :

```env
# Remplace avec l'URL de ton projet Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co

# Remplace avec la clé anon/public de Supabase
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# URL du backend (garde cette valeur en local)
VITE_API_URL=http://localhost:3000

# Remplace avec ta clé publique Stripe (pk_test_...)
VITE_STRIPE_PUBLIC_KEY=pk_test_51xxxxx
```

### 3.3 Installer les dépendances

```bash
npm install
```

## ⚙️ Étape 4 : Configuration du Backend

### 4.1 Créer le fichier .env pour le backend

```bash
cd backend
cp .env.example .env
```

### 4.2 Éditer backend/.env

```env
# Remplace avec ta clé secrète Stripe (sk_test_...)
STRIPE_SECRET_KEY=sk_test_51xxxxx

# Remplace avec ton webhook secret Stripe (whsec_...)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Remplace avec l'URL de ton projet Supabase
SUPABASE_URL=https://xxxxx.supabase.co

# Remplace avec la clé service_role de Supabase (⚠️ ne partage jamais)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Configuration du serveur (garde ces valeurs)
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 4.3 Installer les dépendances backend

```bash
npm install
cd ..
```

## 🚀 Étape 5 : Lancer l'application

### 5.1 Démarrer le backend (Terminal 1)

```bash
cd backend
npm run dev
```

Tu devrais voir :
```
Server running on :3000
```

### 5.2 Démarrer le frontend (Terminal 2)

Dans un nouveau terminal :

```bash
npm run dev
```

Tu devrais voir :
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5.3 Ouvrir l'application

Ouvre ton navigateur et va sur : **http://localhost:5173**

Tu devrais voir la page d'accueil d'ElectroMed avec :
- ✅ Un design clair et moderne
- ✅ Une navbar avec logo ElectroMed
- ✅ Des boutons "Connexion" et "Essayer gratuitement"
- ✅ Une section Hero avec animations
- ✅ Les sections Services, Tarifs, etc.

## ✅ Vérification de la connexion

### Frontend ↔ Backend

Pour vérifier que le frontend peut communiquer avec le backend :

1. Ouvre la console du navigateur (F12)
2. Dans l'onglet Console, tape :

```javascript
fetch('http://localhost:3000/health').then(r => r.json()).then(console.log)
```

Tu devrais voir : `{ status: 'ok' }`

### Frontend ↔ Supabase

Pour vérifier la connexion à Supabase :

1. Clique sur "Connexion" dans l'application
2. Essaye de créer un compte
3. Tu devrais recevoir un email de confirmation de Supabase

## 🐛 Résolution de problèmes

### Erreur CORS

Si tu vois une erreur CORS dans la console :

1. Vérifie que `FRONTEND_URL` dans `backend/.env` est bien `http://localhost:5173`
2. Redémarre le backend

### Erreur "Supabase not configured"

1. Vérifie que les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont bien dans `.env`
2. Vérifie qu'il n'y a pas d'espaces avant/après les valeurs
3. Redémarre le frontend (Ctrl+C puis `npm run dev`)

### Le backend ne démarre pas

1. Vérifie que la variable `STRIPE_SECRET_KEY` est bien dans `backend/.env`
2. Vérifie que le port 3000 n'est pas déjà utilisé :
   ```bash
   lsof -ti:3000 | xargs kill -9  # macOS/Linux
   ```

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Stripe](https://stripe.com/docs)
- [Documentation React](https://react.dev)
- [Documentation Vite](https://vitejs.dev)

## 🎉 Prochaines étapes

Maintenant que tout est configuré, tu peux :

1. **Créer un compte** : Clique sur "Essayer gratuitement"
2. **Explorer le dashboard** : Une fois connecté, accède au tableau de bord
3. **Réserver une session** : Teste le système de réservation
4. **Acheter des crédits** : Teste le système de paiement Stripe

Bon développement ! 🚀
