# Guide de déploiement - Dashboard Admin ElectroMed

Ce guide explique comment déployer et configurer le dashboard admin complet.

## 📋 Prérequis

1. **Supabase CLI** installé
2. **Projet Supabase** créé et configuré
3. **Variables d'environnement** configurées (`.env.local`)

## 🚀 Étapes de déploiement

### 1. Configurer les RLS Policies

Exécutez le script SQL dans l'éditeur SQL de Supabase :

```bash
# Copiez le contenu de src/lib/rls-policies.sql
# Collez-le dans l'éditeur SQL de Supabase Dashboard
# Exécutez le script
```

Ou via Supabase CLI :

```bash
supabase db execute -f src/lib/rls-policies.sql
```

### 2. Déployer l'Edge Function

```bash
# Se connecter à Supabase
supabase login

# Lier votre projet
supabase link --project-ref votre-project-ref

# Déployer la fonction
supabase functions deploy create-coach-user
```

### 3. Vérifier les variables d'environnement

Assurez-vous que `.env.local` contient :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

### 4. Tester le dashboard admin

1. Connectez-vous avec un compte `franchise_owner` ou `admin`
2. Accédez à `/admin`
3. Testez la création d'un coach

## 🔒 Sécurité

### RLS Policies

Les policies sont configurées pour :
- ✅ Limiter l'accès aux données selon les rôles
- ✅ Protéger les opérations sensibles (création, modification, suppression)
- ✅ Isoler les données par franchise

### Edge Function

La fonction `create-coach-user` :
- ✅ Vérifie l'authentification
- ✅ Valide les permissions (franchise_owner/admin)
- ✅ Vérifie la propriété de la franchise
- ✅ Gère les erreurs avec rollback

## 🐛 Dépannage

### Erreur : "Token invalide"
- Vérifiez que l'utilisateur est bien connecté
- Vérifiez que le token n'a pas expiré

### Erreur : "Permissions insuffisantes"
- Vérifiez que l'utilisateur a le rôle `franchise_owner` ou `admin`
- Vérifiez que le rôle est bien défini dans `user_profiles`

### Erreur : "Franchise non trouvée"
- Vérifiez que l'utilisateur est bien propriétaire d'une franchise
- Vérifiez que la franchise existe dans la table `franchises`

### Edge Function ne répond pas
- Vérifiez que la fonction est bien déployée
- Vérifiez les logs dans Supabase Dashboard
- Vérifiez que les variables d'environnement sont correctes

## 📝 Notes importantes

1. **Mot de passe temporaire** : Les coachs créés reçoivent un mot de passe temporaire généré automatiquement. Ils devront le changer à la première connexion.

2. **Email unique** : L'email doit être unique dans Supabase Auth.

3. **Rollback automatique** : Si une étape échoue, toutes les données créées sont automatiquement supprimées.

4. **Performance** : Les index créés dans le script SQL optimisent les performances des requêtes.

## 🔄 Mise à jour

Pour mettre à jour l'Edge Function :

```bash
supabase functions deploy create-coach-user
```

Pour mettre à jour les RLS Policies :

```bash
# Modifiez src/lib/rls-policies.sql
# Ré-exécutez le script dans Supabase Dashboard
```



