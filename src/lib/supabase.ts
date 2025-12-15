import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Créer le client Supabase uniquement si les variables d'environnement sont définies
// Note: supabase sera null si les variables d'environnement ne sont pas configurées
export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Afficher les messages uniquement en développement
if (import.meta.env.DEV) {
  if (supabase) {
    console.log('✅ Supabase connecté')
  } else {
    console.warn('⚠️ Supabase non configuré - Les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY ne sont pas définies')
  }
}
