import { type ReactNode } from 'react'
import { useAuthInit } from '../../hooks/useAuthInit'

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Provider pour initialiser l'authentification au démarrage de l'app
 * et écouter les changements d'état d'authentification
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/0c2a2f4b-375e-479e-93de-de2d6a507319',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthProvider.tsx:13',message:'AuthProvider render',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  try {
    useAuthInit()
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/0c2a2f4b-375e-479e-93de-de2d6a507319',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthProvider.tsx:17',message:'useAuthInit called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/0c2a2f4b-375e-479e-93de-de2d6a507319',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthProvider.tsx:20',message:'useAuthInit error',data:{error:error instanceof Error ? error.message : String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  }
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/0c2a2f4b-375e-479e-93de-de2d6a507319',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AuthProvider.tsx:24',message:'AuthProvider returning children',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  return <>{children}</>
}
