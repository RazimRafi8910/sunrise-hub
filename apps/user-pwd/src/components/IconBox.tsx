import type { ReactNode } from 'react'

export function IconBox({
  children,
  className,
  size = 'lg',
}: {
  children: ReactNode
  className?: string
  size?: 'lg' | 'sm'
}) {
  const box =
    size === 'lg' ? 'size-[44px] rounded-icon-lg' : 'size-10 rounded-icon-sm'

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${box} ${className ?? 'bg-amber-tint'}`}
    >
      {children}
    </span>
  )
}
