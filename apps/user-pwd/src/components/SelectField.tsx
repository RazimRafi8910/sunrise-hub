import { useState, type ComponentPropsWithoutRef } from 'react'
import { Icon, type IconName } from './Icon'

export type SelectOption = {
  value: string
  label: string
}

export type SelectFieldProps = {
  id: string
  label: string
  name?: string
  placeholder: string
  options: (SelectOption | string)[]
  icon?: IconName
  error?: string
  register?: any
} & ComponentPropsWithoutRef<'select'>

export function SelectField({
  id,
  label,
  name,
  placeholder,
  options,
  icon,
  error,
  value,
  className = '',
  register,
  ...rest
}: SelectFieldProps) {
  const [isPlaceholderSelected, setIsPlaceholderSelected] = useState(!value || value === '')
  console.log(value)
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
        <select
          id={id}
          value={value}
          defaultValue={""}
          {...register(name)}
          onChange={(e) => {
            setIsPlaceholderSelected(e.target.value === '')
            register.onChange?.(e)
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-[52px] w-full appearance-none rounded-[16px] border-0 bg-bg text-[15px] transition-colors ${isPlaceholderSelected
            ? 'font-normal text-muted'
            : 'font-semibold text-ink'
            } ${icon ? 'pl-12' : 'pl-4'} pr-10 ${error
              ? 'outline-2 outline-danger outline-offset-2'
              : 'focus:outline-2 focus:outline-ink focus:outline-offset-2'
            } ${className}`}
          {...rest}
        >
          <option value="" disabled hidden className="text-muted">
            {placeholder}
          </option>
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value
            const lbl = typeof opt === 'string' ? opt : opt.label
            return (
              <option key={val} value={val} className="text-ink">
                {lbl}
              </option>
            )
          })}
        </select>
        <span className="pointer-events-none absolute right-4 flex items-center justify-center text-muted">
          <Icon name="chevronDown" size={20} strokeWidth={1.8} />
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[12px] font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
