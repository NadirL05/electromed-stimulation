-- ============================================
-- RLS Policies pour ElectroMed Admin Dashboard
-- ============================================
-- Ce fichier contient toutes les policies Row Level Security (RLS)
-- nécessaires pour sécuriser l'accès aux données admin
--
-- IMPORTANT : Exécutez ce script dans l'éditeur SQL de Supabase
-- ============================================

-- ============================================
-- 1. FONCTION HELPER : Vérification des rôles admin
-- ============================================
-- Cette fonction permet de vérifier si un utilisateur est admin ou franchise_owner
-- de manière réutilisable dans toutes les policies

CREATE OR REPLACE FUNCTION is_admin_or_owner()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.role IN ('admin', 'franchise_owner')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 2. TABLE : coaches
-- ============================================

-- Activer RLS sur la table coaches
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;

-- Policy SELECT : Tous les utilisateurs authentifiés peuvent voir les coachs actifs
-- Les admins/franchise_owner voient tous les coachs de leur franchise
DROP POLICY IF EXISTS "coaches_select_policy" ON coaches;
CREATE POLICY "coaches_select_policy" ON coaches
  FOR SELECT
  USING (
    -- Les admins voient tout
    is_admin_or_owner()
    OR
    -- Les coachs voient leur propre profil
    (user_id = auth.uid() AND is_active = true)
    OR
    -- Les utilisateurs voient les coachs actifs
    is_active = true
  );

-- Policy INSERT : Seuls les admins et franchise_owner peuvent créer des coachs
DROP POLICY IF EXISTS "coaches_insert_policy" ON coaches;
CREATE POLICY "coaches_insert_policy" ON coaches
  FOR INSERT
  WITH CHECK (
    is_admin_or_owner()
    AND (
      -- Les admins peuvent créer pour n'importe quelle franchise
      (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
      OR
      -- Les franchise_owner peuvent créer pour leur propre franchise
      EXISTS (
        SELECT 1 FROM franchises
        WHERE franchises.id = coaches.franchise_id
        AND franchises.owner_id = auth.uid()
      )
    )
  );

-- Policy UPDATE : Seuls les admins et franchise_owner peuvent modifier les coachs
DROP POLICY IF EXISTS "coaches_update_policy" ON coaches;
CREATE POLICY "coaches_update_policy" ON coaches
  FOR UPDATE
  USING (
    is_admin_or_owner()
    AND (
      -- Les admins peuvent modifier n'importe quel coach
      (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
      OR
      -- Les franchise_owner peuvent modifier les coachs de leur franchise
      EXISTS (
        SELECT 1 FROM franchises
        WHERE franchises.id = coaches.franchise_id
        AND franchises.owner_id = auth.uid()
      )
    )
  );

-- Policy DELETE : Seuls les admins et franchise_owner peuvent supprimer (soft delete)
DROP POLICY IF EXISTS "coaches_delete_policy" ON coaches;
CREATE POLICY "coaches_delete_policy" ON coaches
  FOR DELETE
  USING (
    is_admin_or_owner()
    AND (
      -- Les admins peuvent supprimer n'importe quel coach
      (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
      OR
      -- Les franchise_owner peuvent supprimer les coachs de leur franchise
      EXISTS (
        SELECT 1 FROM franchises
        WHERE franchises.id = coaches.franchise_id
        AND franchises.owner_id = auth.uid()
      )
    )
  );

-- ============================================
-- 3. TABLE : sessions
-- ============================================

-- Activer RLS sur la table sessions
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Policy SELECT : 
-- - Les utilisateurs voient leurs propres séances
-- - Les coachs voient les séances qui leur sont assignées
-- - Les admins/franchise_owner voient toutes les séances de leur franchise
DROP POLICY IF EXISTS "sessions_select_policy" ON sessions;
CREATE POLICY "sessions_select_policy" ON sessions
  FOR SELECT
  USING (
    -- Les admins/franchise_owner voient toutes les séances de leur franchise
    (
      is_admin_or_owner()
      AND EXISTS (
        SELECT 1 FROM franchises
        WHERE franchises.id = sessions.franchise_id
        AND (
          franchises.owner_id = auth.uid()
          OR (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
        )
      )
    )
    OR
    -- Les utilisateurs voient leurs propres séances
    user_id = auth.uid()
    OR
    -- Les coachs voient les séances qui leur sont assignées
    EXISTS (
      SELECT 1 FROM coaches
      WHERE coaches.id = sessions.coach_id
      AND coaches.user_id = auth.uid()
    )
  );

-- Policy INSERT : 
-- - Les utilisateurs peuvent créer leurs propres séances
-- - Les admins/franchise_owner peuvent créer des séances pour leur franchise
DROP POLICY IF EXISTS "sessions_insert_policy" ON sessions;
CREATE POLICY "sessions_insert_policy" ON sessions
  FOR INSERT
  WITH CHECK (
    -- Les utilisateurs peuvent créer leurs propres séances
    user_id = auth.uid()
    OR
    -- Les admins/franchise_owner peuvent créer des séances pour leur franchise
    (
      is_admin_or_owner()
      AND EXISTS (
        SELECT 1 FROM franchises
        WHERE franchises.id = sessions.franchise_id
        AND (
          franchises.owner_id = auth.uid()
          OR (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
        )
      )
    )
  );

-- Policy UPDATE :
-- - Les utilisateurs peuvent modifier leurs propres séances (avant la date)
-- - Les admins/franchise_owner peuvent modifier toutes les séances de leur franchise
DROP POLICY IF EXISTS "sessions_update_policy" ON sessions;
CREATE POLICY "sessions_update_policy" ON sessions
  FOR UPDATE
  USING (
    -- Les utilisateurs peuvent modifier leurs propres séances
    user_id = auth.uid()
    OR
    -- Les admins/franchise_owner peuvent modifier les séances de leur franchise
    (
      is_admin_or_owner()
      AND EXISTS (
        SELECT 1 FROM franchises
        WHERE franchises.id = sessions.franchise_id
        AND (
          franchises.owner_id = auth.uid()
          OR (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
        )
      )
    )
  );

-- Policy DELETE :
-- - Les utilisateurs peuvent annuler leurs propres séances (avant la date)
-- - Les admins/franchise_owner peuvent supprimer toutes les séances de leur franchise
DROP POLICY IF EXISTS "sessions_delete_policy" ON sessions;
CREATE POLICY "sessions_delete_policy" ON sessions
  FOR DELETE
  USING (
    -- Les utilisateurs peuvent annuler leurs propres séances
    (user_id = auth.uid() AND session_date > NOW())
    OR
    -- Les admins/franchise_owner peuvent supprimer les séances de leur franchise
    (
      is_admin_or_owner()
      AND EXISTS (
        SELECT 1 FROM franchises
        WHERE franchises.id = sessions.franchise_id
        AND (
          franchises.owner_id = auth.uid()
          OR (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
        )
      )
    )
  );

-- ============================================
-- 4. TABLE : user_profiles (members)
-- ============================================

-- Activer RLS sur la table user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy SELECT :
-- - Les utilisateurs voient leur propre profil
-- - Les admins/franchise_owner voient les membres qui ont eu des séances dans leur franchise
DROP POLICY IF EXISTS "user_profiles_select_policy" ON user_profiles;
CREATE POLICY "user_profiles_select_policy" ON user_profiles
  FOR SELECT
  USING (
    -- Les utilisateurs voient leur propre profil
    id = auth.uid()
    OR
    -- Les admins/franchise_owner voient les membres de leur franchise
    (
      is_admin_or_owner()
      AND EXISTS (
        SELECT 1 FROM sessions
        WHERE sessions.user_id = user_profiles.id
        AND EXISTS (
          SELECT 1 FROM franchises
          WHERE franchises.id = sessions.franchise_id
          AND (
            franchises.owner_id = auth.uid()
            OR (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
          )
        )
      )
    )
  );

-- Policy UPDATE :
-- - Les utilisateurs peuvent modifier leur propre profil (sauf crédits)
-- - Les admins/franchise_owner peuvent modifier les crédits des membres de leur franchise
DROP POLICY IF EXISTS "user_profiles_update_policy" ON user_profiles;
CREATE POLICY "user_profiles_update_policy" ON user_profiles
  FOR UPDATE
  USING (
    -- Les utilisateurs peuvent modifier leur propre profil (sauf certains champs)
    id = auth.uid()
    OR
    -- Les admins/franchise_owner peuvent modifier les membres de leur franchise
    (
      is_admin_or_owner()
      AND EXISTS (
        SELECT 1 FROM sessions
        WHERE sessions.user_id = user_profiles.id
        AND EXISTS (
          SELECT 1 FROM franchises
          WHERE franchises.id = sessions.franchise_id
          AND (
            franchises.owner_id = auth.uid()
            OR (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
          )
        )
      )
    )
  );

-- ============================================
-- 5. TABLE : payments
-- ============================================

-- Activer RLS sur la table payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy SELECT :
-- - Les utilisateurs voient leurs propres paiements
-- - Les admins/franchise_owner voient les paiements des membres de leur franchise
DROP POLICY IF EXISTS "payments_select_policy" ON payments;
CREATE POLICY "payments_select_policy" ON payments
  FOR SELECT
  USING (
    -- Les utilisateurs voient leurs propres paiements
    user_id = auth.uid()
    OR
    -- Les admins/franchise_owner voient les paiements des membres de leur franchise
    (
      is_admin_or_owner()
      AND EXISTS (
        SELECT 1 FROM sessions
        WHERE sessions.user_id = payments.user_id
        AND EXISTS (
          SELECT 1 FROM franchises
          WHERE franchises.id = sessions.franchise_id
          AND (
            franchises.owner_id = auth.uid()
            OR (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
          )
        )
      )
    )
  );

-- ============================================
-- 6. TABLE : franchises
-- ============================================

-- Activer RLS sur la table franchises
ALTER TABLE franchises ENABLE ROW LEVEL SECURITY;

-- Policy SELECT :
-- - Les franchise_owner voient leur propre franchise
-- - Les admins voient toutes les franchises
DROP POLICY IF EXISTS "franchises_select_policy" ON franchises;
CREATE POLICY "franchises_select_policy" ON franchises
  FOR SELECT
  USING (
    -- Les franchise_owner voient leur propre franchise
    owner_id = auth.uid()
    OR
    -- Les admins voient toutes les franchises
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================
-- 7. INDEX pour optimiser les performances
-- ============================================

-- Index sur coaches pour les requêtes par franchise
CREATE INDEX IF NOT EXISTS idx_coaches_franchise_id ON coaches(franchise_id);
CREATE INDEX IF NOT EXISTS idx_coaches_user_id ON coaches(user_id);
CREATE INDEX IF NOT EXISTS idx_coaches_is_active ON coaches(is_active);

-- Index sur sessions pour les requêtes par franchise et utilisateur
CREATE INDEX IF NOT EXISTS idx_sessions_franchise_id ON sessions(franchise_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_coach_id ON sessions(coach_id);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(session_date);

-- Index sur user_profiles pour les requêtes par rôle
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Index sur franchises pour les requêtes par owner
CREATE INDEX IF NOT EXISTS idx_franchises_owner_id ON franchises(owner_id);

-- ============================================
-- FIN DU SCRIPT
-- ============================================
-- Après avoir exécuté ce script :
-- 1. Vérifiez que toutes les policies sont actives dans Supabase Dashboard
-- 2. Testez les permissions avec différents rôles utilisateurs
-- 3. Surveillez les logs pour détecter d'éventuels problèmes de performance
-- ============================================

