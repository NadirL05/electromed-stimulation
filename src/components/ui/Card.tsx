import type { PropsWithChildren, ReactNode } from 'react'

interface CardProps extends PropsWithChildren {
  title?: string
  description?: string
  actions?: ReactNode
}

export function Card({ title, description, actions, children }: CardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20">
      {(title || actions) && (
        <div className="mb-2 flex items-center justify-between gap-2">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {actions}
        </div>
      )}
      {description && <p className="mb-3 text-sm text-zinc-400">{description}</p>}
      {children}
    </div>
  )
}



