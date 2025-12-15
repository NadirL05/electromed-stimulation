type LogLevel = 'info' | 'warn' | 'error'

interface LogPayload {
  message: string
  context?: Record<string, unknown>
}

const log = (level: LogLevel, payload: LogPayload) => {
  const time = new Date().toISOString()
  const base = `[ElectroMed][${level.toUpperCase()}][${time}]`

  // Pour l’instant on loggue dans la console.
  // TODO: En production, envoyer vers un service externe (Sentry, LogRocket, Datadog…)
  // eslint-disable-next-line no-console
  console[level](`${base} ${payload.message}`, payload.context ?? {})
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) =>
    log('info', { message, context }),
  warn: (message: string, context?: Record<string, unknown>) =>
    log('warn', { message, context }),
  error: (message: string, context?: Record<string, unknown>) =>
    log('error', { message, context }),
}


