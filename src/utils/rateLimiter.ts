export interface RateLimitState {
  attempts: number
  firstAttemptAt: number
}

const STORAGE_KEY_PREFIX = 'electromed:ratelimit:'

const getKey = (key: string) => `${STORAGE_KEY_PREFIX}${key}`

export function getRateLimitState(key: string): RateLimitState | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(getKey(key))
  if (!raw) return null
  try {
    return JSON.parse(raw) as RateLimitState
  } catch {
    return null
  }
}

export function setRateLimitState(key: string, state: RateLimitState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(getKey(key), JSON.stringify(state))
}

export function clearRateLimitState(key: string) {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(getKey(key))
}

export function canAttempt(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now()
  const state = getRateLimitState(key)

  if (!state) {
    return { allowed: true, retryAfterMs: 0 }
  }

  const elapsed = now - state.firstAttemptAt
  if (elapsed > windowMs) {
    // Fenêtre expirée, on réinitialise
    clearRateLimitState(key)
    return { allowed: true, retryAfterMs: 0 }
  }

  if (state.attempts < maxAttempts) {
    return { allowed: true, retryAfterMs: 0 }
  }

  const retryAfterMs = windowMs - elapsed
  return { allowed: false, retryAfterMs }
}

export function recordAttempt(key: string) {
  const now = Date.now()
  const state = getRateLimitState(key)

  if (!state) {
    setRateLimitState(key, { attempts: 1, firstAttemptAt: now })
    return
  }

  setRateLimitState(key, {
    attempts: state.attempts + 1,
    firstAttemptAt: state.firstAttemptAt,
  })
}


