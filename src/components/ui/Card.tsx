import type { PropsWithChildren, ReactNode } from 'react'

interface CardProps extends PropsWithChildren {
  title?: string
  description?: string
  actions?: ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'dark'
  className?: string
}

export function Card({ 
  title, 
  description, 
  actions, 
  children, 
  variant = 'default',
  className = '' 
}: CardProps) {
  const variants = {
    default: 'border border-gray-100 bg-white shadow-sm',
    elevated: 'bg-white shadow-lg shadow-gray-200/50',
    outlined: 'border-2 border-gray-200 bg-white',
    dark: 'border border-white/10 bg-zinc-900 text-white',
  }

  const titleColors = {
    default: 'text-[#111827]',
    elevated: 'text-[#111827]',
    outlined: 'text-[#111827]',
    dark: 'text-white',
  }

  const descColors = {
    default: 'text-[#6B7280]',
    elevated: 'text-[#6B7280]',
    outlined: 'text-[#6B7280]',
    dark: 'text-zinc-400',
  }

  return (
    <div className={`rounded-2xl p-5 transition-shadow duration-200 hover:shadow-md ${variants[variant]} ${className}`}>
      {(title || actions) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && <h3 className={`text-lg font-semibold ${titleColors[variant]}`}>{title}</h3>}
          {actions}
        </div>
      )}
      {description && <p className={`mb-4 text-sm ${descColors[variant]}`}>{description}</p>}
      {children}
    </div>
  )
}



