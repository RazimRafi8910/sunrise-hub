import { Icon, type IconName } from '../../components/Icon'
import { IconBox } from '../../components/IconBox'
import { Card } from '../../components/Card'

const rows: {
  title: string
  time: string
  amount: string
  icon: IconName
  iconClass: string
  amountClass?: string
}[] = [
  {
    title: 'Canteen · Lunch combo',
    time: 'Today, 1:10 PM',
    amount: '−₹85.00',
    icon: 'utensils',
    iconClass: 'bg-amber-tint',
  },
  {
    title: 'Store · Notebook',
    time: 'Yesterday, 11:40 AM',
    amount: '−₹40.00',
    icon: 'pencil',
    iconClass: 'bg-amber-tint',
  },
  {
    title: 'Wallet top-up',
    time: 'Mon, 9:05 AM',
    amount: '+₹500.00',
    icon: 'plus',
    iconClass: 'bg-green-bg',
    amountClass:
      'rounded-pill bg-green-bg px-2.5 py-1 text-[13px] font-extrabold text-green-ink',
  },
]

export function RecentActivity() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-extrabold tracking-[-0.01em]">Recent activity</h2>
        <button
          type="button"
          className="min-h-11 border-0 bg-transparent px-1 text-[13px] font-extrabold text-ink"
          onClick={() => {}}
        >
          See all
        </button>
      </div>

      <Card className="flex flex-col px-4 py-1.5">
        {rows.map((row, index) => (
          <div
            key={row.title}
            className={`flex items-center gap-3 py-3 ${
              index < rows.length - 1 ? 'border-b border-divider' : ''
            }`}
          >
            <IconBox size="sm" className={row.iconClass}>
              <Icon
                name={row.icon}
                size={22}
                strokeWidth={row.icon === 'plus' ? 2 : 1.8}
                className="text-ink"
              />
            </IconBox>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="text-[14px] font-bold">{row.title}</p>
              <p className="text-[12px] text-muted">{row.time}</p>
            </div>
            <p className={row.amountClass ?? 'text-[14px] font-extrabold'}>{row.amount}</p>
          </div>
        ))}
      </Card>
    </section>
  )
}
