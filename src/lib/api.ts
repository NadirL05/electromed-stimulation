/**
 * Service API pour communiquer avec le backend Express
 */

// Récupérer l'URL du backend depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Classe pour gérer les erreurs API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Interface pour les sessions de checkout
 */
export interface CreateCheckoutSessionRequest {
  packId: string
  userId: string
  successUrl: string
  cancelUrl: string
  subscriptionId?: string
}

export interface CreateCheckoutSessionResponse {
  url: string
}

/**
 * Fonction helper pour faire des requêtes fetch avec gestion d'erreurs
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    // Erreur réseau ou autre
    throw new ApiError(
      error instanceof Error ? error.message : 'Une erreur réseau est survenue',
      undefined,
      error
    )
  }
}

/**
 * API pour créer une session de checkout Stripe
 */
export async function createCheckoutSession(
  data: CreateCheckoutSessionRequest
): Promise<CreateCheckoutSessionResponse> {
  return fetchApi<CreateCheckoutSessionResponse>('/api/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * API pour vérifier la santé du backend
 */
export async function checkBackendHealth(): Promise<{ status: string }> {
  return fetchApi<{ status: string }>('/health')
}

/**
 * Fonction utilitaire pour vérifier si le backend est disponible
 */
export async function isBackendAvailable(): Promise<boolean> {
  try {
    await checkBackendHealth()
    return true
  } catch {
    return false
  }
}
