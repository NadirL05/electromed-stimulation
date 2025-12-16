# 🏥 ElectroMed SaaS

Plateforme de gestion de franchises d'électrostimulation médicale.

## 🚀 Stack Technique
- **Frontend**: React 19 + TypeScript + Vite  
- **Styling**: Tailwind CSS 4.1  
- **Backend**: Supabase (PostgreSQL + Auth)  
- **Paiements**: Stripe (à venir)  

## 🛠️ Installation

### 1. Clone le projet et installe les dépendances
```bash
# Clone le projet
git clone https://github.com/ton-username/electromed-saas.git
cd electromed-saas

# Installe les dépendances frontend
npm install

# Installe les dépendances backend
cd backend
npm install
cd ..
```

### 2. Configuration Frontend
```bash
# Copie le fichier .env d'exemple
cp .env.example .env

# Édite le fichier .env avec tes credentials :
# - VITE_SUPABASE_URL: URL de ton projet Supabase
# - VITE_SUPABASE_ANON_KEY: Clé anonyme Supabase
# - VITE_API_URL: URL du backend (http://localhost:3000 en local)
# - VITE_STRIPE_PUBLIC_KEY: Clé publique Stripe
```

**Pour obtenir les credentials Supabase :**
1. Crée un projet sur [https://supabase.com](https://supabase.com)
2. Va dans Settings > API
3. Copie l'URL et la clé anonyme (anon/public)

**Pour obtenir les clés Stripe :**
1. Crée un compte sur [https://stripe.com](https://stripe.com)
2. Va dans Developers > API keys
3. Copie la clé publique (pk_test_...)

### 3. Configuration Backend
```bash
# Crée le fichier .env dans le dossier backend
cd backend
cp .env.example .env

# Édite backend/.env avec :
# - STRIPE_SECRET_KEY: Clé secrète Stripe (sk_test_...)
# - STRIPE_WEBHOOK_SECRET: Secret webhook Stripe
# - SUPABASE_URL: URL Supabase
# - SUPABASE_SERVICE_ROLE_KEY: Clé service role Supabase
# - PORT: 3000
# - FRONTEND_URL: http://localhost:5173
```

**Pour obtenir la Service Role Key Supabase :**
1. Va dans Settings > API de ton projet Supabase
2. Copie la clé "service_role" (⚠️ Ne partage jamais cette clé !)

### 4. Lancement de l'application

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
# Le backend démarre sur http://localhost:3000
```

**Terminal 2 - Frontend :**
```bash
npm run dev
# Le frontend démarre sur http://localhost:5173
```

Ouvre [http://localhost:5173](http://localhost:5173) dans ton navigateur.

### 5. Build Production
```bash
# Build frontend
npm run build

# Le backend utilise le fichier server.js tel quel
```

## 📁 Structure du Projet
```
src/
├── components/     # Composants React
├── lib/            # Clients (Supabase, etc.)
├── stores/         # Zustand stores
├── types/          # Types TypeScript
└── App.tsx         # App principale
```

## 🔐 Variables d'Environnement
Voir `.env.example` / `.env.local` pour la liste complète.

## 📝 Roadmap
- [x] Setup projet React + Supabase
- [x] Design landing page
- [x] Système d'authentification
- [x] Dashboard admin
- [ ] Intégration Stripe
- [ ] Système de réservations
