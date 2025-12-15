# RLS Policies pour le Dashboard Admin

Ce document liste les RLS (Row Level Security) policies à configurer dans Supabase pour sécuriser l'accès admin.

## Prérequis

Les policies suivantes doivent être configurées dans Supabase pour que le dashboard admin fonctionne correctement.

## 1. Table `coaches`

### SELECT - Voir tous les coachs de la franchise
```sql
CREATE POLICY "franchise_owners_can_view_their_coaches"
ON coaches FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM franchises
    WHERE franchises.id = coaches.franchise_id
    AND franchises.owner_id = auth.uid()
  )
);
```

### INSERT - Créer un coach
```sql
CREATE POLICY "franchise_owners_can_create_coaches"
ON coaches FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM franchises
    WHERE franchises.id = coaches.franchise_id
    AND franchises.owner_id = auth.uid()
  )
);
```

### UPDATE - Modifier un coach
```sql
CREATE POLICY "franchise_owners_can_update_their_coaches"
ON coaches FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM franchises
    WHERE franchises.id = coaches.franchise_id
    AND franchises.owner_id = auth.uid()
  )
);
```

### DELETE - Supprimer un coach (soft delete via is_active)
```sql
CREATE POLICY "franchise_owners_can_delete_their_coaches"
ON coaches FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM franchises
    WHERE franchises.id = coaches.franchise_id
    AND franchises.owner_id = auth.uid()
  )
);
```

## 2. Table `sessions`

### SELECT - Voir toutes les séances de la franchise
```sql
CREATE POLICY "franchise_owners_can_view_their_sessions"
ON sessions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM franchises
    WHERE franchises.id = sessions.franchise_id
    AND franchises.owner_id = auth.uid()
  )
);
```

### UPDATE - Modifier une séance
```sql
CREATE POLICY "franchise_owners_can_update_their_sessions"
ON sessions FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM franchises
    WHERE franchises.id = sessions.franchise_id
    AND franchises.owner_id = auth.uid()
  )
);
```

### DELETE - Annuler une séance
```sql
CREATE POLICY "franchise_owners_can_delete_their_sessions"
ON sessions FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM franchises
    WHERE franchises.id = sessions.franchise_id
    AND franchises.owner_id = auth.uid()
  )
);
```

## 3. Table `user_profiles`

### SELECT - Voir les membres de la franchise
```sql
CREATE POLICY "franchise_owners_can_view_members"
ON user_profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM sessions
    WHERE sessions.user_id = user_profiles.id
    AND EXISTS (
      SELECT 1 FROM franchises
      WHERE franchises.id = sessions.franchise_id
      AND franchises.owner_id = auth.uid()
    )
  )
  OR user_profiles.id = auth.uid()
);
```

### UPDATE - Modifier les crédits des membres
```sql
CREATE POLICY "franchise_owners_can_update_member_credits"
ON user_profiles FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM sessions
    WHERE sessions.user_id = user_profiles.id
    AND EXISTS (
      SELECT 1 FROM franchises
      WHERE franchises.id = sessions.franchise_id
      AND franchises.owner_id = auth.uid()
    )
  )
);
```

## 4. Table `payments`

### SELECT - Voir les paiements de la franchise
```sql
CREATE POLICY "franchise_owners_can_view_payments"
ON payments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM subscriptions
    WHERE subscriptions.id = payments.subscription_id
    AND EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.user_id = subscriptions.user_id
      AND EXISTS (
        SELECT 1 FROM franchises
        WHERE franchises.id = sessions.franchise_id
        AND franchises.owner_id = auth.uid()
      )
    )
  )
);
```

## 5. Table `franchises`

### SELECT - Voir sa propre franchise
```sql
CREATE POLICY "franchise_owners_can_view_their_franchise"
ON franchises FOR SELECT
USING (franchises.owner_id = auth.uid());
```

## Notes importantes

1. **Rôle utilisateur** : Assurez-vous que le rôle `franchise_owner` est correctement défini dans la table `user_profiles`.

2. **Création de coachs** : La création d'utilisateurs coachs nécessite un endpoint backend ou une Edge Function Supabase car `supabase.auth.admin` n'est pas disponible côté client.

3. **Tests** : Testez chaque policy avec différents rôles utilisateurs pour vous assurer qu'elles fonctionnent correctement.

4. **Performance** : Les policies avec des sous-requêtes peuvent impacter les performances. Considérez l'ajout d'index si nécessaire.

## Commandes SQL pour appliquer les policies

Exécutez ces commandes dans l'éditeur SQL de Supabase :

```sql
-- Désactiver RLS temporairement pour les tests (NE PAS FAIRE EN PRODUCTION)
-- ALTER TABLE coaches DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE sessions DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE franchises DISABLE ROW LEVEL SECURITY;

-- Activer RLS
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchises ENABLE ROW LEVEL SECURITY;

-- Puis créer les policies ci-dessus
```

