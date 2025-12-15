import Modal from '../ui/Modal'
import AuthForm from './AuthForm'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Créer un compte ElectroMed"
      description="Créez votre compte pour réserver des séances et suivre vos résultats."
    >
      <AuthForm mode="signup" onSuccess={onClose} />
    </Modal>
  )
}


