import type { PropsWithChildren, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ModalProps extends PropsWithChildren {
  isOpen: boolean
  title?: string
  description?: string
  onClose: () => void
  footer?: ReactNode
  icon?: LucideIcon
  iconColor?: string
}

export default function Modal({
  isOpen,
  title,
  description,
  onClose,
  footer,
  children,
  icon: Icon,
  iconColor = 'from-[#2563EB] to-[#60A5FA]',
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-[#6B7280] transition-all hover:bg-gray-100 hover:text-[#111827]"
              aria-label="Fermer la fenêtre"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header with optional icon */}
            {(title || description || Icon) && (
              <header className="space-y-3 px-6 pb-4 pt-6">
                {Icon && (
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${iconColor} text-white shadow-lg`}>
                    <Icon className="h-7 w-7" />
                  </div>
                )}
                {title && (
                  <h2 className={`text-xl font-bold text-[#111827] ${Icon ? 'text-center' : 'pr-10'}`}>
                    {title}
                  </h2>
                )}
                {description && (
                  <p className={`text-sm text-[#6B7280] ${Icon ? 'text-center' : ''}`}>
                    {description}
                  </p>
                )}
              </header>
            )}

            {/* Content */}
            <div className="px-6 pb-6">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


