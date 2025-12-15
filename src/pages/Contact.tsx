import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Layout from '../components/layout/Layout'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { contactSchema, type ContactFormValues } from '../utils/validation'

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    // Pour l’instant, on simule l’envoi.
    // TODO: connecter à un endpoint (Supabase / backend) ou service externe.
    // eslint-disable-next-line no-console
    console.info('Contact form submitted', data)
    await new Promise((resolve) => setTimeout(resolve, 800))
    reset()
  }

  return (
    <Layout>
      <section className="space-y-3">
        <h1 className="text-3xl font-bold text-[#111827]">Contactez-nous</h1>
        <p className="max-w-2xl text-sm text-[#6B7280] sm:text-base">
          Parlez-nous de votre projet de franchise EMS et découvrez comment ElectroMed peut
          vous aider à structurer vos opérations.
        </p>
      </section>

      <section className="mt-8 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nom complet"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-[#111827]">
              Message
            </label>
            <textarea
              className={`min-h-[140px] w-full rounded-xl border px-4 py-3 text-sm text-[#111827] shadow-sm outline-none transition focus:ring-2 focus:ring-[#2563EB]/40 ${
                errors.message ? 'border-red-400' : 'border-gray-200'
              }`}
              {...register('message')}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          {isSubmitSuccessful && (
            <p className="text-sm text-[#10B981]">
              Merci ! Votre message a bien été envoyé. Nous vous répondrons rapidement.
            </p>
          )}

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="mt-2"
          >
            Envoyer le message
          </Button>
        </form>

        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm shadow-black/5 ring-1 ring-gray-100">
          <h2 className="text-lg font-semibold text-[#111827]">Informations</h2>
          <p className="text-sm text-[#6B7280]">
            Vous pouvez également nous contacter par email pour toute question liée à la
            sécurité, au support ou à un partenariat.
          </p>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium text-[#111827]">Support : </span>
              <a href="mailto:support@electromed.com" className="text-[#2563EB]">
                support@electromed.com
              </a>
            </p>
            <p>
              <span className="font-medium text-[#111827]">Sécurité : </span>
              <a href="mailto:security@electromed.com" className="text-[#2563EB]">
                security@electromed.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}


