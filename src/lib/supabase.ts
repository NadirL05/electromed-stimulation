import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {}
const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

const hasUrl = !!supabaseUrl && supabaseUrl !== 'https://your-project.supabase.co'
const hasKey = !!supabaseAnonKey && supabaseAnonKey !== 'your-anon-key'

if (!hasUrl || !hasKey) {
  console.error('❌ Variables Supabase manquantes ou placeholders. Vérifiez .env.local')
  throw new Error('Variables Supabase manquantes : VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient<Database>(
  supabaseUrl!,
  supabaseAnonKey!
)

if (hasUrl && hasKey) {
  console.log('✅ Supabase connecté')
} else {
  console.warn('⚠️ Supabase non configuré : ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local')
}
