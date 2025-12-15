-- Migration : Ajout d'index sur la table payments pour optimiser les requêtes
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- Index sur stripe_payment_intent_id pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_payments_stripe_payment_intent_id 
ON payments(stripe_payment_intent_id);

-- Index sur user_id pour les requêtes par utilisateur
CREATE INDEX IF NOT EXISTS idx_payments_user_id 
ON payments(user_id);

-- Index sur status pour filtrer les paiements réussis
CREATE INDEX IF NOT EXISTS idx_payments_status 
ON payments(status);

-- Index composite sur user_id et created_at pour les requêtes d'historique
CREATE INDEX IF NOT EXISTS idx_payments_user_created 
ON payments(user_id, created_at DESC);

