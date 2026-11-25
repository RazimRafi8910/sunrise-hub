import type { ReactNode } from 'react'

export function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-card bg-surface shadow-[0_4px_16px_rgba(27,33,66,0.08)] ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
