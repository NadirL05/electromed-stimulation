import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL est manquant dans les variables d’environnement')
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY est manquant dans les variables d’environnement')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('✅ Supabase connecté')

