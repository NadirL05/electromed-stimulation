import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {}
const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

const hasUrl = !!supabaseUrl && supabaseUrl !== 'https://your-project.supabase.co'
const hasKey = !!supabaseAnonKey && supabaseAnonKey !== 'your-anon-key'

export const isSupabaseConfigured = hasUrl && hasKey

// Créer un client Supabase uniquement si configuré, sinon un mock pour éviter les erreurs
export const supabase: SupabaseClient<Database> = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!)
  : createClient<Database>('https://placeholder.supabase.co', 'placeholder-key')

if (isSupabaseConfigured) {
  console.log('✅ Supabase connecté')
} else {
  console.warn('⚠️ Supabase non configuré : ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local')
  console.warn('   L\'application fonctionne en mode démo sans authentification.')
}
