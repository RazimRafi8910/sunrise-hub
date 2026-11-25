import { useNavigate } from 'react-router'
import { Icon, type IconName } from '../../components/Icon'
import { IconBox } from '../../components/IconBox'

function ServiceTile({
  name,
  subtitle,
  icon,
  soon,
  onClick,
}: {
  name: string
  subtitle: string
  icon: IconName
  soon?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className="flex min-h-[124px] flex-col justify-between gap-[14px] rounded-[20px] border-0 bg-white p-4 text-left text-[#1B2142] shadow-[0_4px_16px_rgba(27,33,66,0.08)] motion-safe:transition-transform motion-safe:active:scale-[0.98] md:min-h-[132px] md:p-5"
      onClick={onClick}
    >
      <span className={soon ? 'flex items-start justify-between' : undefined}>
        <IconBox
          className={
            soon
              ? 'rounded-full bg-[#F5EFE6]'
              : 'rounded-full bg-[#FDE4B8]'
          }
        >
          <Icon name={icon} className="text-[#1B2142]" />
        </IconBox>
        {soon ? (
          <span className="rounded-pill bg-[#F5EFE6] px-[9px] py-1 text-[11px] font-bold text-[#4A4F66]">
            Soon
          </span>
        ) : null}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[15px] font-extrabold text-[#1B2142]">{name}</span>
        <span className="text-[12px] text-[#1B2142]/65">{subtitle}</span>
      </span>
    </button>
  )
}

export function ServicesGrid() {
  const navigate = useNavigate()

  return (
    <section className="flex h-full flex-col gap-3">
      <h2 className="text-[18px] font-extrabold tracking-[-0.01em] md:text-[20px]">Services</h2>
      <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 lg:gap-4">
        <ServiceTile name="Canteen" subtitle="Order and pay" icon="utensils" />
        <ServiceTile name="Store" subtitle="Stationery" icon="pencil" />
        <ServiceTile
          name="Report"
          subtitle="Report violation"
          icon="shieldAlert"
          onClick={() => navigate('/report')}
        />
        <ServiceTile name="Events" subtitle="What is coming up" icon="calendarDays" soon />
      </div>
    </section>
  )
}
