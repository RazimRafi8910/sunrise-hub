import { useState, type ComponentPropsWithoutRef } from 'react'
import { Icon } from './Icon'

export type PasswordFieldProps = {
  id: string
  label: string
  name: string
  error?: string
  register?: any
} & Omit<ComponentPropsWithoutRef<'input'>, 'type'>

export function PasswordField({
  id,
  label,
  name,
  error,
  className = '',
  register,
  ...rest
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  if (typeof register !== 'function') {
    register = (n) => (n)
  }
  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor={id} className="text-[12px] font-semibold text-muted">
        {label}
      </label>
      <div className="relative flex w-full items-center">
        <span className="pointer-events-none absolute left-4 flex items-center justify-center text-muted">
          <Icon name="lock" size={20} strokeWidth={1.8} />
        </span>
        <input
          id={id}
          {...register(name)}
          type={showPassword ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-[52px] w-full rounded-[16px] border-0 bg-bg text-[15px] font-semibold text-ink placeholder:font-normal placeholder:text-muted transition-colors pl-12 pr-12 ${error
            ? 'outline-2 outline-danger outline-offset-2'
            : 'focus:outline-2 focus:outline-ink focus:outline-offset-2'
            } ${className}`}
          {...rest}
        />
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-1 flex size-[44px] items-center justify-center rounded-full text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
        >
          <Icon name={showPassword ? 'eyeOff' : 'eye'} size={20} strokeWidth={1.8} />
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[12px] font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
