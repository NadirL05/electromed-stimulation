import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  variant?: 'light' | 'dark'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, variant = 'light', className = '', id, ...props }, ref) => {
    const inputId = id || props.name || label?.toLowerCase().replace(/\s+/g, '-')
    
    const variants = {
      light: {
        label: 'text-[#374151]',
        input: 'border-gray-200 bg-white text-[#111827] placeholder-[#9CA3AF] focus:border-[#2563EB] focus:ring-[#2563EB]/20',
        hint: 'text-[#6B7280]',
        error: 'text-red-600',
      },
      dark: {
        label: 'text-zinc-200',
        input: 'border-zinc-700 bg-zinc-800/50 text-white placeholder-zinc-400 focus:border-orange-500 focus:ring-orange-500/20',
        hint: 'text-zinc-400',
        error: 'text-red-400',
      },
    }

    const v = variants[variant]

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className={`mb-2 block text-sm font-medium ${v.label}`}
          >
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={[
            'w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200',
            'focus:outline-none focus:ring-2',
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : v.input,
            className,
          ].join(' ')}
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className={`mt-1.5 text-xs ${v.hint}`}>
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className={`mt-1.5 text-sm ${v.error}`} role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'






