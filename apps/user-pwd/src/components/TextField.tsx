import type { ComponentPropsWithoutRef } from 'react'
import { Icon, type IconName } from './Icon'

export type TextFieldProps = {
  id: string
  label: string
  icon?: IconName
  error?: string
} & ComponentPropsWithoutRef<'input'>

export function TextField({
  id,
  label,
  icon,
  error,
  className = '',
  ...rest
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor={id} className="text-[12px] font-semibold text-muted">
        {label}
      </label>
      <div className="relative flex w-full items-center">
        {icon && (
          <span className="pointer-events-none absolute left-4 flex items-center justify-center text-muted">
            <Icon name={icon} size={20} strokeWidth={1.8} />
          </span>
        )}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-[52px] w-full rounded-[16px] border-0 bg-bg text-[15px] font-semibold text-ink placeholder:font-normal placeholder:text-muted transition-colors ${
            icon ? 'pl-12' : 'pl-4'
          } pr-4 ${
            error
              ? 'outline-2 outline-danger outline-offset-2'
              : 'focus:outline-2 focus:outline-ink focus:outline-offset-2'
          } ${className}`}
          {...rest}
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[12px] font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
