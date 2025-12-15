import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle2, User, MessageSquare } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { contactSchema, type ContactFormValues } from '../utils/validation'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Notre équipe répond sous 24h',
    value: 'contact@electromed.fr',
    href: 'mailto:contact@electromed.fr',
    color: 'from-[#2563EB] to-[#60A5FA]',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    description: 'Lun - Ven, 9h - 18h',
    value: '+33 1 23 45 67 89',
    href: 'tel:+33123456789',
    color: 'from-[#10B981] to-[#34D399]',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    description: 'Siège social',
    value: '123 Avenue de la Santé, Paris',
    href: '#',
    color: 'from-[#F97316] to-[#FDBA74]',
  },
]

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
    // eslint-disable-next-line no-console
    console.info('Contact form submitted', data)
    await new Promise((resolve) => setTimeout(resolve, 800))
    reset()
  }

  return (
    <Layout>
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 text-center"
      >
        <span className="inline-block rounded-full bg-[#EFF6FF] px-4 py-1.5 text-xs font-semibold text-[#2563EB]">
          Contact
        </span>
        <h1 className="text-3xl font-bold text-[#111827] sm:text-4xl">
          Parlons de votre projet
        </h1>
        <p className="mx-auto max-w-2xl text-[#6B7280]">
          Vous souhaitez en savoir plus sur ElectroMed ou démarrer votre franchise EMS ? 
          Notre équipe est là pour vous accompagner.
        </p>
      </motion.section>

      {/* Contact cards */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {contactInfo.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md transition-transform group-hover:scale-110`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-[#111827]">{item.title}</h3>
              <p className="mt-1 text-xs text-[#9CA3AF]">{item.description}</p>
              <p className="mt-2 text-sm font-medium text-[#2563EB]">{item.value}</p>
            </motion.a>
          )
        })}
      </section>

      {/* Form section */}
      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_400px]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-100 sm:p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-[#111827]">
            Envoyez-nous un message
          </h2>

          {isSubmitSuccessful ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF5]">
                <CheckCircle2 className="h-8 w-8 text-[#10B981]" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827]">Message envoyé !</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
              </p>
              <Button variant="secondary" className="mt-6" onClick={() => reset()}>
                Envoyer un autre message
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-[38px] h-5 w-5 text-[#9CA3AF]" />
                  <Input
                    label="Nom complet"
                    placeholder="Jean Dupont"
                    className="pl-12"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                </div>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-[38px] h-5 w-5 text-[#9CA3AF]" />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="vous@exemple.com"
                    autoComplete="email"
                    className="pl-12"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-[#374151]">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-[#9CA3AF]" />
                  <textarea
                    placeholder="Décrivez votre projet ou posez vos questions..."
                    className={`min-h-[160px] w-full resize-none rounded-xl border bg-white px-4 py-3 pl-12 text-sm text-[#111827] placeholder-[#9CA3AF] transition-all focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 ${
                      errors.message ? 'border-red-400' : 'border-gray-200'
                    }`}
                    {...register('message')}
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                size="lg"
                className="w-full sm:w-auto"
              >
                <Send className="h-4 w-4" />
                Envoyer le message
              </Button>
            </form>
          )}
        </motion.div>

        {/* Side info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] p-6 text-white">
            <h3 className="text-lg font-semibold">Vous êtes professionnel ?</h3>
            <p className="mt-2 text-sm text-blue-100">
              Découvrez notre offre franchise et rejoignez le réseau ElectroMed. 
              Formation, équipement et accompagnement inclus.
            </p>
            <Button variant="secondary" size="sm" className="mt-4 bg-white text-[#2563EB] hover:bg-blue-50">
              Devenir franchisé
            </Button>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h3 className="font-semibold text-[#111827]">FAQ</h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              Consultez notre FAQ pour trouver des réponses à vos questions les plus fréquentes.
            </p>
            <a href="/#faq" className="mt-3 inline-flex text-sm font-medium text-[#2563EB] hover:underline">
              Voir la FAQ →
            </a>
          </div>

          <div className="rounded-2xl bg-[#ECFDF5] p-6">
            <h3 className="font-semibold text-[#065F46]">Support technique</h3>
            <p className="mt-2 text-sm text-[#047857]">
              Vous êtes déjà client et avez besoin d'aide ? Contactez notre support dédié.
            </p>
            <a 
              href="mailto:support@electromed.fr" 
              className="mt-3 inline-flex text-sm font-medium text-[#065F46] hover:underline"
            >
              support@electromed.fr →
            </a>
          </div>
        </motion.div>
      </section>
    </Layout>
  )
}


