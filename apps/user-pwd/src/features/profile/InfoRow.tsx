import { Icon, type IconName } from '../../components/Icon'

export function InfoRow({
  icon,
  label,
  value,
  divider = true,
}: {
  icon: IconName
  label: string
  value: string
  divider?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-[14px] py-3 ${
        divider ? 'border-b border-divider' : ''
      }`}
    >
      <Icon name={icon} className="shrink-0 text-ink" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-[12px] text-muted">{label}</p>
        <p className="text-[15px] font-semibold">{value}</p>
      </div>
    </div>
  )
}
