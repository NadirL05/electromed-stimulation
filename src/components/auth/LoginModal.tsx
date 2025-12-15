import { LogIn } from 'lucide-react'
import Modal from '../ui/Modal'
import AuthForm from './AuthForm'
import { useAuthModals } from '../../contexts/AuthModalContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { openSignup, closeModals } = useAuthModals()

  const handleSwitchToSignup = () => {
    closeModals()
    setTimeout(openSignup, 100)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Connexion à ElectroMed"
      description="Accédez à votre espace membre, coach ou administrateur."
      icon={LogIn}
      iconColor="from-[#2563EB] to-[#60A5FA]"
      footer={
        <p className="text-center text-sm text-[#6B7280]">
          Pas encore de compte ?{' '}
          <button
            type="button"
            onClick={handleSwitchToSignup}
            className="font-semibold text-[#2563EB] transition hover:text-[#1D4ED8] hover:underline"
          >
            Créer un compte
          </button>
        </p>
      }
    >
      <AuthForm mode="login" onSuccess={onClose} />
    </Modal>
  )
}


