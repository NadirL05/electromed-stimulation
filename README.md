# 🏥 ElectroMed SaaS

Plateforme de gestion de franchises d'électrostimulation médicale.

## 🚀 Stack Technique
- **Frontend**: React 19 + TypeScript + Vite  
- **Styling**: Tailwind CSS 4.1  
- **Backend**: Supabase (PostgreSQL + Auth)  
- **Paiements**: Stripe (à venir)  

## 🛠️ Installation
```bash
# Clone le projet
git clone https://github.com/ton-username/electromed-saas.git

# Installe les dépendances
npm install
```

### Configuration Supabase (optionnel mais recommandé)
```bash
cp .env.example .env.local
# Édite .env.local avec tes credentials Supabase :
# VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
```
Lorsque l'application démarre avec une configuration Supabase valide, un log "✅ Supabase connecté" apparaît dans la console du navigateur.

### Lancement du serveur de développement
```bash
npm run dev
# Ouvre http://localhost:5173
```

### Build
```bash
npm run build
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
