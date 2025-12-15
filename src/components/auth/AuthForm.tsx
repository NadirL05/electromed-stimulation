import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
        const { email, password, fullName } = values as SignupFormValues
        await signup(email, password, fullName)
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
        <Input
          label="Nom complet"
          {...register('fullName' as const)}
          error={errors['fullName']?.message as string | undefined}
        />
      )}
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        {...register('email' as const)}
        error={errors.email?.message as string | undefined}
      />
      <Input
        label="Mot de passe"
        type="password"
        autoComplete={isLogin ? 'current-password' : 'new-password'}
        {...register('password' as const)}
        error={errors.password?.message as string | undefined}
      />
      {!isLogin && (
        <Input
          label="Confirmation du mot de passe"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword' as const)}
          error={errors['confirmPassword']?.message as string | undefined}
        />
      )}

      {globalError && (
        <p className="text-sm text-red-600" role="alert">
          {globalError}
        </p>
      )}

      {!rateLimit.canAttempt && (
        <p className="text-xs text-[#6B7280]">
          Trop de tentatives. Réessayez dans {rateLimit.retryAfterSeconds} secondes.
        </p>
      )}

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="mt-2 w-full"
      >
        {isLogin ? 'Se connecter' : "Créer mon compte"}
      </Button>
    </form>
  )
}


