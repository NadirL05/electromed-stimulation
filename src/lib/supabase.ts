import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Créer le client Supabase uniquement si les variables d'environnement sont définies
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

if (supabase) {
  console.log('✅ Supabase connecté')
} else {
  console.warn('⚠️ Supabase non configuré - Les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY ne sont pas définies')
}
