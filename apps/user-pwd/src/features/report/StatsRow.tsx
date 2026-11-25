import { Link } from 'react-router'
import type { ReportStats } from './types'

export interface StatsRowProps {
  stats?: ReportStats
  loading?: boolean
}

export function StatsRow({ stats, loading = false }: StatsRowProps) {
  if (loading || !stats) {
    return (
      <section
        aria-busy="true"
        aria-label="Loading report counts"
        className="grid grid-cols-3 divide-x divide-[#1B2142]/10 overflow-hidden rounded-[20px] bg-white shadow-[0_4px_16px_rgba(27,33,66,0.08)]"
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="flex min-h-[78px] flex-col items-center justify-center gap-2 px-2 py-3.5"
          >
            <div className="h-6 w-8 animate-pulse rounded-md bg-[#1B2142]/12 motion-reduce:animate-none" />
            <div className="h-3.5 w-14 animate-pulse rounded-md bg-[#1B2142]/8 motion-reduce:animate-none" />
          </div>
        ))}
      </section>
    )
  }

  const items = [
    {
      label: 'Submitted',
      count: stats.submitted,
      to: '/reports?status=submitted',
    },
    {
      label: 'In review',
      count: stats.inReview,
      to: '/reports?status=under_review',
    },
    {
      label: 'Verified',
      count: stats.verified,
      to: '/reports?status=verified',
    },
  ]

  return (
    <section
      aria-label="Your report summary"
      className="grid grid-cols-3 divide-x divide-[#1B2142]/10 overflow-hidden rounded-[20px] bg-white shadow-[0_4px_16px_rgba(27,33,66,0.08)]"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="flex min-h-[78px] flex-col items-center justify-center px-2 py-3.5 text-center motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1B2142]"
        >
          <span className="text-[22px] font-extrabold leading-tight text-[#1B2142]">
            {item.count}
          </span>
          <span className="mt-0.5 text-[12px] font-semibold text-[#1B2142]/65">
            {item.label}
          </span>
        </Link>
      ))}
    </section>
  )
}
