// Rate limiter simple basé sur localStorage
// Limite le nombre de tentatives d'authentification

interface AttemptRecord {
  timestamp: number
}

const STORAGE_KEY_PREFIX = 'rateLimit:'

function getStorageKey(key: string): string {
  return `${STORAGE_KEY_PREFIX}${key}`
}

function getAttempts(key: string): AttemptRecord[] {
  try {
    const stored = localStorage.getItem(getStorageKey(key))
    if (!stored) return []
    return JSON.parse(stored) as AttemptRecord[]
  } catch {
    return []
  }
}

function saveAttempts(key: string, attempts: AttemptRecord[]): void {
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(attempts))
  } catch {
    // Ignore storage errors
  }
}

export interface RateLimitResult {
  allowed: boolean
  retryAfterMs: number
}

export function canAttempt(
  key: string,
  maxAttempts: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now()
  const attempts = getAttempts(key)
  
  // Nettoyer les tentatives expirées
  const validAttempts = attempts.filter(
    (attempt) => now - attempt.timestamp < windowMs
  )
  
  if (validAttempts.length >= maxAttempts) {
    // Trouver la plus ancienne tentative valide
    const oldestAttempt = validAttempts[0]
    const retryAfterMs = windowMs - (now - oldestAttempt.timestamp)
    
    // Sauvegarder les tentatives nettoyées
    saveAttempts(key, validAttempts)
    
    return {
      allowed: false,
      retryAfterMs: Math.max(0, retryAfterMs),
    }
  }
  
  // Sauvegarder les tentatives nettoyées
  saveAttempts(key, validAttempts)
  
  return {
    allowed: true,
    retryAfterMs: 0,
  }
}

export function recordAttempt(key: string): void {
  const attempts = getAttempts(key)
  attempts.push({ timestamp: Date.now() })
  saveAttempts(key, attempts)
}

export function clearRateLimitState(key: string): void {
  try {
    localStorage.removeItem(getStorageKey(key))
  } catch {
    // Ignore storage errors
  }
}

