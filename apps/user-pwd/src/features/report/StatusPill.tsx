import type { ReportStatus } from './types'

export interface StatusPillProps {
  status: ReportStatus
}

const STATUS_CONFIG: Record<
  ReportStatus,
  { label: string; className: string }
> = {
  submitted: {
    label: 'Submitted',
    className: 'bg-[#ECEAFE] text-[#1B2142]',
  },
  under_review: {
    label: 'Under review',
    className: 'bg-[#DBEAFE] text-[#1E40AF]',
  },
  verified: {
    label: 'Verified',
    className: 'bg-[#DCFCE7] text-[#166534]',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-[#FEE2E2] text-[#991B1B]',
  },
  action_taken: {
    label: 'Action taken',
    className: 'bg-[#FFEDD5] text-[#9A3412]',
  },
  closed: {
    label: 'Closed',
    className: 'bg-[#F1F5F9] text-[#334155]',
  },
}

export function StatusPill({ status }: StatusPillProps) {
  const { label, className } = STATUS_CONFIG[status]

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[12px] font-bold leading-none ${className}`}
    >
      {label}
    </span>
  )
}
