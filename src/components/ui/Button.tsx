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
      primary: 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 hover:shadow-xl hover:shadow-orange-500/40 focus-visible:ring-orange-500 transition-all duration-300',
      secondary: 'border-2 border-gray-200 bg-white/90 backdrop-blur-sm text-gray-900 hover:border-gray-300 hover:bg-white hover:shadow-md focus-visible:ring-gray-400 transition-all duration-300',
      ghost: 'text-gray-700 hover:bg-gray-100/80 focus-visible:ring-gray-400 transition-all duration-200',
      danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/40 focus-visible:ring-red-500 transition-all duration-300',
      success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:shadow-emerald-500/40 focus-visible:ring-emerald-500 transition-all duration-300',
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






