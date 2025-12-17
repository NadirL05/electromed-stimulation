import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, ArrowRight, Lock, Mail, User } from 'lucide-react'
import { loginSchema, signupSchema, type LoginFormValues, type SignupFormValues } from '../../utils/validation'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useAuthStore } from '../../stores/authStore'
import { useRateLimit } from '../../hooks/useRateLimit'

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSuccess?: () => void
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const isLogin = mode === 'login'
  const { login, signup } = useAuthStore()
  const [globalError, setGlobalError] = useState<string | null>(null)

  const rateLimit = useRateLimit(`auth:${mode}`, {
    maxAttempts: isLogin ? 5 : 3,
    windowMs: isLogin ? 15 * 60_000 : 30 * 60_000,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues | SignupFormValues>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  })

  const onSubmit = async (values: LoginFormValues | SignupFormValues) => {
    setGlobalError(null)

    if (!rateLimit.canAttempt) {
      setGlobalError(
        `Trop de tentatives. Réessayez dans ${rateLimit.retryAfterSeconds} secondes.`
      )
      return
    }

    rateLimit.registerAttempt()

    try {
      if (isLogin) {
        const { email, password } = values as LoginFormValues
        await login(email, password)
      } else {
        const { email, password, name } = values as SignupFormValues
        await signup(email, password, name)
      }
      rateLimit.reset()
      onSuccess?.()
    } catch (error) {
      if (error instanceof Error) {
        setGlobalError(error.message)
      } else {
        setGlobalError('Une erreur est survenue. Merci de réessayer.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isLogin && (
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-[38px] h-5 w-5 text-[#9CA3AF]" />
          <Input
            label="Nom complet"
            placeholder="Jean Dupont"
            className="pl-12"
            {...register('name')}
            error={(errors as any).name?.message}
          />
        </div>
      )}
      
      <div className="relative">
        <Mail className="pointer-events-none absolute left-4 top-[38px] h-5 w-5 text-[#9CA3AF]" />
        <Input
          label="Email"
          type="email"
          placeholder="vous@exemple.com"
          autoComplete="email"
          className="pl-12"
          {...register('email' as const)}
          error={errors.email?.message as string | undefined}
        />
      </div>
      
      <div className="relative">
        <Lock className="pointer-events-none absolute left-4 top-[38px] h-5 w-5 text-[#9CA3AF]" />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          className="pl-12"
          hint={!isLogin ? 'Min. 8 caractères, 1 majuscule, 1 chiffre' : undefined}
          {...register('password' as const)}
          error={errors.password?.message as string | undefined}
        />
      </div>
      
      {!isLogin && (
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-[38px] h-5 w-5 text-[#9CA3AF]" />
          <Input
            label="Confirmation du mot de passe"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className="pl-12"
            {...register('confirmPassword')}
            error={(errors as any).confirmPassword?.message}
          />
        </div>
      )}

      {/* Error message */}
      {globalError && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Rate limit warning */}
      {!rateLimit.canAttempt && (
        <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Trop de tentatives. Réessayez dans {rateLimit.retryAfterSeconds} secondes.</span>
        </div>
      )}

      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!rateLimit.canAttempt}
        className="mt-2 w-full"
        size="lg"
      >
        {isLogin ? 'Se connecter' : "Créer mon compte"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </Button>

      {isLogin && (
        <p className="text-center text-xs text-[#9CA3AF]">
          Mot de passe oublié ?{' '}
          <button type="button" className="text-[#2563EB] hover:underline">
            Réinitialiser
          </button>
        </p>
      )}
    </form>
  )
}


