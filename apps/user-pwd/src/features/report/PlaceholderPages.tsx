import type { ReactNode } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { BottomNav } from './BottomNav'

function PlaceholderShell({
  title,
  subtitle,
  children,
  showBottomNav = true,
}: {
  title: string
  subtitle: string
  children?: ReactNode
  showBottomNav?: boolean
}) {
  return (
    <div
      className="min-h-dvh w-full bg-[#FFF7EA] text-[#1B2142] md:flex"
      style={{ fontFamily: 'var(--font-report)' }}
    >
      {showBottomNav ? <BottomNav /> : null}

      <div className="min-w-0 flex-1">
        <header className="rounded-b-[24px] bg-[#1B2142] px-5 pt-[max(20px,env(safe-area-inset-top))] pb-6 text-white md:rounded-b-[32px] md:px-8 md:py-7 lg:px-10">
          <Link
            to="/report"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-bold text-[#FFB020] motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Reports
          </Link>
          <h1 className="mt-1 text-[24px] font-extrabold tracking-[-0.02em] md:text-[28px]">
            {title}
          </h1>
          <p className="mt-0.5 text-[14px] text-white/75">{subtitle}</p>
        </header>

        <main
          className={`px-4 pt-5 md:px-8 md:pt-7 lg:px-10 ${showBottomNav ? 'pb-[112px] md:pb-10' : 'pb-8'}`}
        >
          <div className="rounded-[22px] bg-white p-5 shadow-[0_4px_16px_rgba(27,33,66,0.08)] md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export function MyReportsPage() {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status')

  return (
    <PlaceholderShell
      title="My reports"
      subtitle={
        status
          ? `Filtered by status: ${status.replace('_', ' ')}`
          : 'All rule-violation reports you submitted'
      }
    >
      <p className="text-[14px] leading-relaxed text-[#1B2142]/75">
        This placeholder view will list your submitted reports
        {status ? ` filtered by "${status}"` : ''} once connected to{' '}
        <code className="rounded bg-[#FFF7EA] px-1.5 py-0.5 text-[12px] font-bold text-[#1B2142]">
          GET /reports/me
        </code>
        .
      </p>
    </PlaceholderShell>
  )
}

export function NewReportPage() {
  return (
    <PlaceholderShell
      title="Report a violation"
      subtitle="Capture a photo or choose from gallery"
      showBottomNav={false}
    >
      <p className="text-[14px] leading-relaxed text-[#1B2142]/75">
        Violation submission form placeholder. Camera capture, rule picker, and
        location fields will go here.
      </p>
    </PlaceholderShell>
  )
}

export function AgainstMeReportsPage() {
  return (
    <PlaceholderShell
      title="Reports against you"
      subtitle="Verified incidents and appeal instructions"
    >
      <p className="text-[14px] leading-relaxed text-[#1B2142]/75">
        This placeholder view will display reports from{' '}
        <code className="rounded bg-[#FFF7EA] px-1.5 py-0.5 text-[12px] font-bold text-[#1B2142]">
          GET /reports/against-me
        </code>{' '}
        without exposing reporter identity.
      </p>
    </PlaceholderShell>
  )
}

export function ReportDetailPage() {
  const { id } = useParams()

  return (
    <PlaceholderShell
      title="Report details"
      subtitle={id ? `Reference #${id}` : 'Report status and timeline'}
    >
      <p className="text-[14px] leading-relaxed text-[#1B2142]/75">
        Detailed timeline and evidence view placeholder for report{' '}
        <span className="font-bold text-[#1B2142]">{id}</span>.
      </p>
    </PlaceholderShell>
  )
}

export function RulesPage() {
  return (
    <PlaceholderShell
      title="Campus rules"
      subtitle="Conduct guidelines and dress code"
    >
      <p className="text-[14px] leading-relaxed text-[#1B2142]/75">
        Campus rules directory placeholder. Students and staff can browse
        official rule descriptions and appeal procedures here.
      </p>
    </PlaceholderShell>
  )
}

export function NotificationsPage() {
  return (
    <PlaceholderShell
      title="Notifications"
      subtitle="Updates on your reports and alerts"
    >
      <p className="text-[14px] leading-relaxed text-[#1B2142]/75">
        Notifications inbox placeholder. Unread count is powered by{' '}
        <code className="rounded bg-[#FFF7EA] px-1.5 py-0.5 text-[12px] font-bold text-[#1B2142]">
          GET /notifications/unread-count
        </code>
        .
      </p>
    </PlaceholderShell>
  )
}
