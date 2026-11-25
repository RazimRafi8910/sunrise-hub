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
        <h2 className="text-[18px] font-extrabold tracking-[-0.01em] text-[#1B2142] md:text-[20px]">
          Recent activity
        </h2>
        <button
          type="button"
          className="min-h-11 border-0 bg-transparent px-1 text-[14px] font-bold text-[#9A3412]"
          onClick={() => {}}
        >
          See all
        </button>
      </div>

      <Card className="flex flex-col px-4 py-1.5 md:px-5 md:py-2">
        {rows.map((row, index) => (
          <div
            key={row.title}
            className={`flex items-center gap-3.5 py-3.5 ${
              index < rows.length - 1 ? 'border-b border-[#1B2142]/8' : ''
            }`}
          >
            <IconBox
              size="sm"
              className={`rounded-full ${
                row.icon === 'plus' ? 'bg-[#DCFCE7]' : 'bg-[#F5EFE6]'
              }`}
            >
              <Icon
                name={row.icon}
                size={20}
                strokeWidth={row.icon === 'plus' ? 2 : 1.8}
                className="text-[#1B2142]"
              />
            </IconBox>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="truncate text-[14px] font-extrabold text-[#1B2142]">
                {row.title}
              </p>
              <p className="text-[12px] text-[#1B2142]/65">{row.time}</p>
            </div>
            <p className={row.amountClass ?? 'text-[14px] font-extrabold text-[#1B2142]'}>
              {row.amount}
            </p>
          </div>
        ))}
      </Card>
    </section>
  )
}
