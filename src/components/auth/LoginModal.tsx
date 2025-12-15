import Modal from '../ui/Modal'
import AuthForm from './AuthForm'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Connexion à ElectroMed"
      description="Accédez à votre espace membre, coach ou administrateur."
    >
      <AuthForm mode="login" onSuccess={onClose} />
    </Modal>
  )
}


