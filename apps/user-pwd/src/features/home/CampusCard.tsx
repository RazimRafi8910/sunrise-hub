import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { RoleChip } from '../../components/RoleChip'

export function CampusCard() {
  const copy = "student"
  const [hidden, setHidden] = useState(true)
  const formatted = 0.0
  const balanceText = hidden ? '₹ ••••••' : `₹${formatted}`

  return (
    <section className="flex flex-col gap-4 rounded-card bg-amber p-5">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-extrabold tracking-[0.1em]">[COLLEGE NAME]</p>
        <RoleChip role={"student"} />
      </div>

      <div className="flex flex-col gap-[3px]">
        <h2 className="text-[21px] font-extrabold tracking-[-0.01em]">{"peter"}</h2>
        <p className="text-[13px] font-semibold text-amber-ink">{23}</p>
        <p className="text-[13px] font-bold tracking-[0.04em]">ID {253453}</p>
      </div>

      <p className="-mb-2.5 text-[13px] font-bold text-amber-ink">Wallet balance</p>

      <div className="flex items-center justify-between">
        <p className="text-[36px] font-extrabold tracking-[-0.03em]">{balanceText}</p>
        <button
          type="button"
          aria-label="Show or hide balance"
          className="flex size-[44px] items-center justify-center rounded-full border-0 bg-transparent text-ink"
          onClick={() => setHidden((value) => !value)}
        >
          <Icon name={hidden ? 'eye' : 'eyeOff'} />
        </button>
      </div>

      <div className="flex gap-2.5">
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
      </div>
    </section>
  )
}
