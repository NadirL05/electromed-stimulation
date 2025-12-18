import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, className = '', ...props }, ref) => {
    const baseStyles = [
      'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
      'transition-all duration-200 ease-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'active:scale-[0.98]',
    ].join(' ')
    
    const variants = {
      primary: 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1D4ED8] hover:shadow-[#2563EB]/40 focus-visible:ring-[#2563EB]',
      secondary: 'border border-gray-200 bg-white text-[#111827] hover:border-[#2563EB]/40 hover:bg-[#EFF6FF] focus-visible:ring-[#2563EB]',
      ghost: 'text-[#2563EB] hover:bg-[#EFF6FF] focus-visible:ring-[#2563EB]',
      danger: 'bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600 focus-visible:ring-red-500',
      success: 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/25 hover:bg-[#059669] focus-visible:ring-[#10B981]',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Chargement...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'






