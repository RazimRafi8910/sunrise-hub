import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { RoleChip } from '../../components/RoleChip'

type CampusCardProp = {
  user: {
    name: string,
    role: string,
    collegeId:string
  }
}

export function CampusCard({ user }:CampusCardProp) {
  const [hidden, setHidden] = useState(true)
  const formatted = 0.0
  const balanceText = hidden ? '₹ ••••••' : `₹${formatted}`

  return (
    <section className="flex w-full flex-col justify-between gap-4 rounded-[22px] bg-[#FFB020] p-5 text-[#1B2142] shadow-[0_4px_16px_rgba(27,33,66,0.08)] md:flex-row md:items-center md:p-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 md:justify-start">
          <p className="text-[12px] font-extrabold tracking-[0.1em] text-[#1B2142]/80">
            SUNRISE COLLEGE
          </p>
          <div className="md:hidden">
            <RoleChip role={ user.role } />
          </div>
        </div>

        <div className="flex flex-col gap-[3px]">
          <h2 className="text-[21px] font-extrabold tracking-[-0.01em] text-[#1B2142]">
            {user.name.toLocaleUpperCase()}
          </h2>
          <p className="text-[13px] font-semibold text-[#1B2142]/75">{23}</p>
          <p className="text-[13px] font-bold tracking-[0.04em] text-[#1B2142]/90">
            ID { user.collegeId }
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
        <div className="hidden md:block">
          <RoleChip role={ user.role } />
        </div>
        <p className="text-[13px] font-extrabold text-[#1B2142]/85 md:text-[14px]">
          Wallet balance : 0
        </p>
      </div>

      {/*<div className="flex items-center justify-between">
        <p className="text-[36px] font-extrabold tracking-[-0.03em]">{balanceText}</p>
        <button
          type="button"
          aria-label="Show or hide balance"
          className="flex size-[44px] items-center justify-center rounded-full border-0 bg-transparent text-ink"
          onClick={() => setHidden((value) => !value)}
        >
          <Icon name={hidden ? 'eye' : 'eyeOff'} />
        </button>
      </div>*/}

      {/*<div className="flex gap-2.5">
        <button
          type="button"
          className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-button border-0 bg-ink text-[15px] font-bold text-surface"
          onClick={() => {}}
        >
          <Icon name="plus" size={18} strokeWidth={2.2} />
          Add money
        </button>
        <button
          type="button"
          aria-label="Show QR code"
          className="flex size-[52px] shrink-0 items-center justify-center rounded-full border-0 bg-surface text-ink"
          onClick={() => {}}
        >
          <Icon name="qrCode" size={26} />
        </button>
      </div>*/}
    </section>
  )
}
