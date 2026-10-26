import { Icon, type IconName } from '../../components/Icon'
import { IconBox } from '../../components/IconBox'
import { useUser } from '../../context/UserContext'
import { getRoleCopy } from '../../mocks/user'

function ServiceTile({
  name,
  subtitle,
  icon,
  soon,
}: {
  name: string
  subtitle: string
  icon: IconName
  soon?: boolean
}) {
  return (
    <button
      type="button"
      className="flex min-h-[124px] flex-col justify-between gap-[14px] rounded-tile border-0 bg-surface p-4 text-left text-ink"
      onClick={() => {}}
    >
      <span className={soon ? 'flex items-start justify-between' : undefined}>
        <IconBox className={soon ? 'bg-grey-tint' : 'bg-amber-tint'}>
          <Icon name={icon} className="text-ink" />
        </IconBox>
        {soon ? (
          <span className="rounded-pill bg-grey-tint px-[9px] py-1 text-[11px] font-bold text-grey-ink">
            Soon
          </span>
        ) : null}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[15px] font-extrabold">{name}</span>
        <span className="text-[12px] text-muted">{subtitle}</span>
      </span>
    </button>
  )
}

export function ServicesGrid() {
  const user = useUser()
  const copy = getRoleCopy(user.role)

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[18px] font-extrabold tracking-[-0.01em]">Services</h2>
      <div className="grid grid-cols-2 gap-3">
        <ServiceTile name="Canteen" subtitle="Order and pay" icon="utensils" />
        <ServiceTile name="Store" subtitle="Stationery" icon="pencil" />
        <ServiceTile name={copy.reportName} subtitle={copy.reportSub} icon="shieldAlert" />
        <ServiceTile name="Events" subtitle="What is coming up" icon="calendarDays" soon />
      </div>
    </section>
  )
}
