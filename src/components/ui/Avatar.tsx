interface AvatarProps {
  name?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  const initials = (name ?? 'U').trim().slice(0, 2).toUpperCase()
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-white/10 text-white ${sizeClass[size]}`}
      aria-label={name || 'Avatar'}
    >
      {initials}
    </div>
  )
}

