import type { PropsWithChildren, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps extends PropsWithChildren {
  isOpen: boolean
  title?: string
  description?: string
  onClose: () => void
  footer?: ReactNode
}

export default function Modal({
  isOpen,
  title,
  description,
  onClose,
  footer,
  children,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl shadow-black/40"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full p-1.5 text-[#6B7280] hover:bg-gray-100 hover:text-[#111827]"
              aria-label="Fermer la fenêtre"
            >
              <X className="h-4 w-4" />
            </button>
            {(title || description) && (
              <header className="mb-4 space-y-1 pr-7">
                {title && (
                  <h2 className="text-lg font-semibold text-[#111827]">{title}</h2>
                )}
                {description && (
                  <p className="text-sm text-[#6B7280]">{description}</p>
                )}
              </header>
            )}
            <div>{children}</div>
            {footer && <div className="mt-5 border-t border-gray-100 pt-3">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


