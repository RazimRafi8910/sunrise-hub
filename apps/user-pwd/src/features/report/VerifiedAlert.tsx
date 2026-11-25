import { Link } from 'react-router'
import type { AgainstMeReport, ReportStatus } from './types'

export interface VerifiedAlertProps {
  reports: AgainstMeReport[]
  to?: string
}

const VERIFIED_OR_LATER: ReadonlySet<ReportStatus> = new Set([
  'verified',
  'action_taken',
  'closed',
])

export function VerifiedAlert({
  reports,
  to = '/reports/against-me',
}: VerifiedAlertProps) {
  const verifiedReports = reports.filter((report) =>
    VERIFIED_OR_LATER.has(report.status),
  )

  if (verifiedReports.length === 0) {
    return null
  }

  const latest = verifiedReports[0]
  const extraCount = verifiedReports.length - 1

  return (
    <Link
      to={to}
      className="flex min-h-[76px] items-center gap-3.5 rounded-[20px] border border-[#F5C563] bg-[#FFF2D6] p-4 shadow-[0_4px_16px_rgba(27,33,66,0.05)] motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
    >
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FFB020] text-[#1B2142]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-extrabold leading-snug text-[#1B2142]">
            A report against you was verified
          </span>
          {extraCount > 0 ? (
            <span className="rounded-full bg-[#9A3412]/12 px-2 py-0.5 text-[11px] font-bold text-[#9A3412]">
              +{extraCount} more
            </span>
          ) : null}
        </span>
        <span className="mt-1 block text-[13px] leading-snug text-[#1B2142]/75">
          {latest.ruleTitle}. To appeal, contact the reviewer or the discipline
          coordinator.
        </span>
      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 shrink-0 text-[#9A3412]"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  )
}
