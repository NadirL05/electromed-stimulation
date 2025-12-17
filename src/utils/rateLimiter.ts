// Rate limiting utility using localStorage
interface RateLimitState {
  attempts: number[]
  windowStart: number
}

const RATE_LIMIT_STORAGE_PREFIX = 'rate_limit_'

function getStorageKey(key: string): string {
  return `${RATE_LIMIT_STORAGE_PREFIX}${key}`
}

function getRateLimitState(key: string): RateLimitState | null {
  try {
    const stored = localStorage.getItem(getStorageKey(key))
    if (!stored) return null
    return JSON.parse(stored) as RateLimitState
  } catch {
    return null
  }
}

function setRateLimitState(key: string, state: RateLimitState): void {
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(state))
  } catch {
    // Ignore storage errors
  }
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

  // Check if window has expired
  if (now - state.windowStart >= windowMs) {
    // Window expired, reset
    clearRateLimitState(key)
    return { allowed: true, retryAfterMs: 0 }
  }

  // Filter out attempts outside the window
  const validAttempts = state.attempts.filter(
    (attemptTime) => now - attemptTime < windowMs
  )

  if (validAttempts.length >= maxAttempts) {
    // Rate limit exceeded
    const oldestAttempt = Math.min(...validAttempts)
    const retryAfterMs = windowMs - (now - oldestAttempt)
    return { allowed: false, retryAfterMs: Math.max(0, retryAfterMs) }
  }

  return { allowed: true, retryAfterMs: 0 }
}

export function recordAttempt(key: string): void {
  const now = Date.now()
  const state = getRateLimitState(key)

  if (!state) {
    const newState: RateLimitState = {
      attempts: [now],
      windowStart: now,
    }
    setRateLimitState(key, newState)
    return
  }

  // Filter out attempts outside the window (1 hour)
  const windowMs = 60 * 60 * 1000
  const validAttempts = state.attempts.filter(
    (attemptTime) => now - attemptTime < windowMs
  )

  validAttempts.push(now)

  const newState: RateLimitState = {
    attempts: validAttempts,
    windowStart: state.windowStart,
  }

  setRateLimitState(key, newState)
}

export function clearRateLimitState(key: string): void {
  try {
    localStorage.removeItem(getStorageKey(key))
  } catch {
    // Ignore storage errors
  }
}

