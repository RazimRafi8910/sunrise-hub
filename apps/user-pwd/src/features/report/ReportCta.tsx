import type { UserRole } from '@sunrise-hub/shared'
import { Link } from 'react-router'

export interface ReportCtaProps {
  to?: string
  className?: string
  userRole: UserRole
}

export function ReportCta({
  to = '/reports/new',
  className = '',
  userRole,
}: ReportCtaProps) {
  const heading = userRole == "student" ? "Report a violation" : "Review a report"
  const description = userRole == "student" ? "Take a photo or pick from your gallery" : "Review and verify the violations that student reports";
  return (
    <Link
      to={to}
      className={`flex min-h-[78px] w-full items-center gap-3.5 rounded-[22px] bg-[#FFB020] px-4 py-4 shadow-[0_4px_16px_rgba(27,33,66,0.08)] motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142] md:px-5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#1B2142] text-[#FFB020]"
      >
        {userRole == "student" ?
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[22px]"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          :
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[22px]"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="m8 14 2.5 2.5L16 11" />
          </svg>
        }
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[17px] font-extrabold leading-snug text-[#1B2142]">
          {heading}
        </span>
        <span className="mt-0.5 block text-[13px] font-semibold leading-snug text-[#1B2142]/80">
          {description}
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
        className="size-5 shrink-0 text-[#1B2142]"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  )
}
