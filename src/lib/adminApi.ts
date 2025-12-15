// API client pour les fonctions admin (Edge Functions Supabase)
import { supabase } from './supabase'

export interface CreateCoachData {
  email: string
  password: string
  full_name: string
  phone?: string
  bio?: string
  specialties?: string[]
  availability?: Record<string, string[]>
  franchise_id: string
}

export interface CreateCoachResponse {
  success: boolean
  coach_id: string
  user_id: string
  message: string
}

export interface ApiError {
  error: string
  message?: string
  details?: string
}

/**
 * Crée un utilisateur coach via l'Edge Function Supabase
 * @param data Données du coach à créer
 * @returns Réponse avec l'ID du coach créé
 * @throws Error si la création échoue
 */
export async function createCoachUser(
  data: CreateCoachData
): Promise<CreateCoachResponse> {
  // Récupérer l'URL de la fonction depuis les variables d'environnement
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {}
  const supabaseUrl = env.VITE_SUPABASE_URL
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variables Supabase non configurées')
  }

  // Récupérer le token de session (avec rafraîchissement si nécessaire)
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) {
    console.error('Erreur récupération session:', sessionError)
    throw new Error('Erreur lors de la récupération de la session')
  }

  if (!session || !session.access_token) {
    throw new Error('Vous devez être connecté pour créer un coach')
  }

  // Vérifier que le token n'est pas expiré et le rafraîchir si nécessaire
  let accessToken = session.access_token
  const now = Math.floor(Date.now() / 1000)
  if (session.expires_at && session.expires_at < now) {
    console.log('Session expirée, rafraîchissement...')
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
    if (refreshError || !refreshData.session) {
      throw new Error('Session expirée. Veuillez vous reconnecter.')
    }
    accessToken = refreshData.session.access_token
  }

  // Utiliser supabase.functions.invoke() qui gère mieux l'authentification avec verify_jwt
  console.log('Appel Edge Function create-coach-user...')
  
  const { data: result, error } = await supabase.functions.invoke('create-coach-user', {
    body: data,
  })

  if (error) {
    console.error('Erreur Edge Function:', error)
    // Si l'erreur est liée à l'authentification, essayer avec fetch manuel
    if (error.message?.includes('401') || error.message?.includes('authorization')) {
      console.log('Tentative avec fetch manuel...')
      return await createCoachUserWithFetch(data, accessToken, supabaseUrl, supabaseAnonKey)
    }
    throw new Error(error.message || 'Erreur lors de la création du coach')
  }

  // Vérifier si la réponse contient une erreur
  if (result && typeof result === 'object' && 'error' in result) {
    const apiError = result as ApiError
    throw new Error(apiError.error || apiError.message || apiError.details || 'Erreur lors de la création du coach')
  }

  return result as CreateCoachResponse
}

/**
 * Fallback: Crée un coach avec fetch manuel si invoke() échoue
 */
async function createCoachUserWithFetch(
  data: CreateCoachData,
  accessToken: string,
  supabaseUrl: string,
  supabaseAnonKey: string
): Promise<CreateCoachResponse> {
  const functionUrl = `${supabaseUrl}/functions/v1/create-coach-user`

  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'apikey': supabaseAnonKey,
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    console.error('Erreur Edge Function (fetch):', {
      status: response.status,
      statusText: response.statusText,
      result,
    })
    const error = result as ApiError
    throw new Error(error.error || error.message || error.details || `Erreur ${response.status}: ${response.statusText}`)
  }

  return result as CreateCoachResponse
}

