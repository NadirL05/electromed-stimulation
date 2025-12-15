import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

// Schémas de validation
const signupSchema = z.object({
  full_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir un chiffre'),
})

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
})

type SignupFormData = z.infer<typeof signupSchema>
type LoginFormData = z.infer<typeof loginSchema>

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const { signup, login } = useAuthStore()

  // Form pour signup
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  // Form pour login
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleSignup = async (data: SignupFormData) => {
    try {
      setError('')
      setSuccess('')
      await signup(data.email, data.password, data.full_name)
      setSuccess('✅ Inscription réussie ! Vérifiez vos emails pour confirmer votre compte.')
      signupForm.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription')
    }
  }

  const handleLogin = async (data: LoginFormData) => {
    try {
      setError('')
      await login(data.email, data.password)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Email ou mot de passe incorrect')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {activeTab === 'login' ? 'Connexion' : 'Inscription'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 transition hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 rounded-lg bg-zinc-800 p-1">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
              activeTab === 'login'
                ? 'bg-orange-500 text-zinc-900'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
              activeTab === 'signup'
                ? 'bg-orange-500 text-zinc-900'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-400">
            {success}
          </div>
        )}

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              error={loginForm.formState.errors.email?.message}
              {...loginForm.register('email')}
            />
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              error={loginForm.formState.errors.password?.message}
              {...loginForm.register('password')}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={loginForm.formState.isSubmitting}
            >
              Se connecter
            </Button>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === 'signup' && (
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
            <Input
              label="Nom complet"
              type="text"
              placeholder="Jean Dupont"
              error={signupForm.formState.errors.full_name?.message}
              {...signupForm.register('full_name')}
            />
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              error={signupForm.formState.errors.email?.message}
              {...signupForm.register('email')}
            />
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              error={signupForm.formState.errors.password?.message}
              {...signupForm.register('password')}
            />
            <p className="text-xs text-zinc-400">
              Min. 8 caractères, 1 majuscule, 1 chiffre
            </p>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={signupForm.formState.isSubmitting}
            >
              Créer un compte
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}


