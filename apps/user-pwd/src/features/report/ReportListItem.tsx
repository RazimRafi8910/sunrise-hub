import { Link } from 'react-router'
import { StatusPill } from './StatusPill'
import type { Report } from './types'

export interface ReportListItemProps {
  report: Report
}

export function ReportListItem({ report }: ReportListItemProps) {
  return (
    <li>
      <Link
        to={`/reports/${report.id}`}
        className="flex min-h-[68px] items-center gap-3.5 px-4 py-3.5 motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1B2142]"
      >
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#F5EFE6] text-[#1B2142]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M8 13h8" />
            <path d="M8 17h6" />
          </svg>
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-extrabold leading-snug text-[#1B2142]">
            {report.ruleTitle}
          </span>
          <span className="mt-0.5 block truncate text-[13px] font-normal leading-snug text-[#1B2142]/65">
            {report.dateLabel} · {report.location}
          </span>
        </span>

        <StatusPill status={report.status} />
      </Link>
    </li>
  )
}
