import type { PropsWithChildren } from 'react'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger'

const variantClass: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white',
  success: 'bg-green-500/20 text-green-200',
  warning: 'bg-amber-500/20 text-amber-200',
  danger: 'bg-red-500/20 text-red-200',
}

interface BadgeProps extends PropsWithChildren {
  variant?: BadgeVariant
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variantClass[variant]}`}>
      {children}
    </span>
  )
}






