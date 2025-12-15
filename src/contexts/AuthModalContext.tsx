import { createContext, useContext, useState, type PropsWithChildren } from 'react'
import LoginModal from '../components/auth/LoginModal'
import SignupModal from '../components/auth/SignupModal'

interface AuthModalContextType {
  openLogin: () => void
  openSignup: () => void
  closeModals: () => void
}

const AuthModalContext = createContext<AuthModalContextType | null>(null)

export function useAuthModals() {
  const context = useContext(AuthModalContext)
  if (!context) {
    throw new Error('useAuthModals must be used within AuthModalProvider')
  }
  return context
}

export function AuthModalProvider({ children }: PropsWithChildren) {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const openLogin = () => {
    setIsSignupOpen(false)
    setIsLoginOpen(true)
  }

  const openSignup = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(true)
  }

  const closeModals = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(false)
  }

  return (
    <AuthModalContext.Provider value={{ openLogin, openSignup, closeModals }}>
      {children}
      <LoginModal isOpen={isLoginOpen} onClose={closeModals} />
      <SignupModal isOpen={isSignupOpen} onClose={closeModals} />
    </AuthModalContext.Provider>
  )
}

