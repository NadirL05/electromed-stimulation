# Edge Function : create-coach-user

Cette Edge Function Supabase permet aux `franchise_owner` et `admin` de créer des comptes utilisateurs coachs avec authentification complète.

## Fonctionnalités

- ✅ Création d'utilisateur dans Supabase Auth
- ✅ Attribution automatique du rôle `coach` dans `user_metadata`
- ✅ Création du profil dans `user_profiles`
- ✅ Insertion dans la table `coaches`
- ✅ Validation des permissions (franchise_owner/admin uniquement)
- ✅ Gestion d'erreurs complète avec rollback
- ✅ Support CORS pour les appels frontend

## Déploiement

### Prérequis

1. Installer Supabase CLI :
```bash
npm install -g supabase
```

2. Se connecter à votre projet Supabase :
```bash
supabase login
supabase link --project-ref votre-project-ref
```

### Déployer la fonction

```bash
# Depuis la racine du projet
supabase functions deploy create-coach-user
```

### Variables d'environnement

La fonction utilise automatiquement les variables d'environnement de votre projet Supabase :
- `SUPABASE_URL` : URL de votre projet (définie automatiquement)
- `SUPABASE_SERVICE_ROLE_KEY` : Clé service role (définie automatiquement)

## Utilisation depuis le frontend

```typescript
import { createCoachUser } from '@/lib/adminApi'

const result = await createCoachUser({
  email: 'coach@example.com',
  password: 'MotDePasseSecurise123!',
  full_name: 'Jean Dupont',
  phone: '+33612345678',
  bio: 'Coach expérimenté en EMS',
  specialties: ['EMS', 'Perte de poids'],
  availability: {
    'Lundi': ['09:00', '10:00', '14:00'],
    'Mardi': ['09:00', '10:00'],
  },
  franchise_id: 'uuid-de-la-franchise'
})
```

## Sécurité

- ✅ Vérification du token d'authentification
- ✅ Validation du rôle utilisateur (franchise_owner/admin)
- ✅ Vérification de la propriété de la franchise
- ✅ Vérification de l'unicité de l'email
- ✅ Rollback automatique en cas d'erreur

## Réponses

### Succès (201)
```json
{
  "success": true,
  "coach_id": "uuid-du-coach",
  "user_id": "uuid-de-l-utilisateur",
  "message": "Coach créé avec succès"
}
```

### Erreurs possibles

- **401** : Token d'authentification manquant ou invalide
- **403** : Permissions insuffisantes
- **404** : Franchise non trouvée
- **409** : Email déjà utilisé
- **500** : Erreur serveur

## Tests

Pour tester la fonction localement :

```bash
supabase functions serve create-coach-user
```

Puis appeler avec curl :

```bash
curl -X POST http://localhost:54321/functions/v1/create-coach-user \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "full_name": "Test Coach",
    "franchise_id": "your-franchise-id"
  }'
```




