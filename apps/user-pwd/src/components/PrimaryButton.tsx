import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type PrimaryButtonProps = {
  children: ReactNode
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryButton({
  children,
  loading = false,
  disabled = false,
  className = '',
  type = 'submit',
  ...rest
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`flex h-[52px] w-full items-center justify-center rounded-button bg-ink text-[15px] font-bold text-surface transition-opacity disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 ${className}`}
      {...rest}
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}
