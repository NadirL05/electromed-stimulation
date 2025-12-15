import { UserPlus } from 'lucide-react'
import Modal from '../ui/Modal'
import AuthForm from './AuthForm'
import { useAuthModals } from '../../contexts/AuthModalContext'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const { openLogin, closeModals } = useAuthModals()

  const handleSwitchToLogin = () => {
    closeModals()
    setTimeout(openLogin, 100)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Créer un compte ElectroMed"
      description="Rejoignez-nous pour réserver vos séances et suivre vos résultats."
      icon={UserPlus}
      iconColor="from-[#10B981] to-[#34D399]"
      footer={
        <p className="text-center text-sm text-[#6B7280]">
          Déjà un compte ?{' '}
          <button
            type="button"
            onClick={handleSwitchToLogin}
            className="font-semibold text-[#2563EB] transition hover:text-[#1D4ED8] hover:underline"
          >
            Se connecter
          </button>
        </p>
      }
    >
      <AuthForm mode="signup" onSuccess={onClose} />
    </Modal>
  )
}


