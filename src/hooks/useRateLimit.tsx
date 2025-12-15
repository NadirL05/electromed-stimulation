import { useEffect, useMemo, useState } from 'react'
import { canAttempt, clearRateLimitState, recordAttempt } from '../utils/rateLimiter'

interface UseRateLimitOptions {
  maxAttempts: number
  windowMs: number
}

export function useRateLimit(key: string, options: UseRateLimitOptions) {
  const { maxAttempts, windowMs } = options
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1_000)
    return () => window.clearInterval(id)
  }, [])

  const { canAttemptNow, retryAfterMs } = useMemo(() => {
    const result = canAttempt(key, maxAttempts, windowMs)
    return {
      canAttemptNow: result.allowed,
      retryAfterMs: result.retryAfterMs,
    }
  }, [key, maxAttempts, windowMs, now])

  const retryAfterSeconds = Math.ceil(retryAfterMs / 1_000)

  const registerAttempt = () => {
    recordAttempt(key)
    setNow(Date.now())
  }

  const reset = () => {
    clearRateLimitState(key)
    setNow(Date.now())
  }

  return {
    canAttempt: canAttemptNow,
    retryAfterMs,
    retryAfterSeconds,
    registerAttempt,
    reset,
  }
}


