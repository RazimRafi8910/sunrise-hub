import { Link } from 'react-router'
import { BottomNav } from './BottomNav'
import { HomeHeader } from './HomeHeader'
import { ReportCta } from './ReportCta'
import { ReportListItem } from './ReportListItem'
import { StatsRow } from './StatsRow'
import type { AgainstMeReport, Report, ReportStats, User } from './types'
import { UserCard } from './UserCard'
import { VerifiedAlert } from './VerifiedAlert'

export interface ReportsHomePageProps {
  user?: User
  reports?: Report[]
  stats?: ReportStats
  againstMeReports?: AgainstMeReport[]
  unreadCount?: number
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
}

const DEFAULT_USER: User = {
  id: 'u-alex-mathew',
  firstName: 'Alex',
  fullName: 'Alex Mathew',
  initials: 'AM',
  course: 'BSc Computer Science',
  year: '2nd year',
  role: 'Student',
}

const DEFAULT_STATS: ReportStats = {
  submitted: 1,
  inReview: 1,
  verified: 3,
}

const DEFAULT_REPORTS: Report[] = [
  {
    id: 'rep-1',
    ruleTitle: 'Uniform',
    dateLabel: 'Today',
    location: 'Canteen',
    status: 'submitted',
  },
  {
    id: 'rep-2',
    ruleTitle: 'ID card',
    dateLabel: 'Yesterday',
    location: 'Library',
    status: 'under_review',
  },
  {
    id: 'rep-3',
    ruleTitle: 'Uniform',
    dateLabel: '18 Nov',
    location: 'Main gate',
    status: 'verified',
  },
]

const DEFAULT_AGAINST_ME_REPORTS: AgainstMeReport[] = [
  {
    id: 'against-1',
    ruleTitle: 'ID card rule',
    status: 'verified',
  },
]

function ReportsListSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading recent reports"
      className="divide-y divide-[#1B2142]/8 overflow-hidden rounded-[22px] bg-white shadow-[0_4px_16px_rgba(27,33,66,0.08)]"
    >
      {[0, 1, 2].map((index) => (
        <div key={index} className="flex min-h-[68px] items-center gap-3.5 px-4 py-3.5">
          <div className="size-11 shrink-0 animate-pulse rounded-full bg-[#1B2142]/10 motion-reduce:animate-none" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-4 w-28 animate-pulse rounded-md bg-[#1B2142]/12 motion-reduce:animate-none" />
            <div className="h-3.5 w-36 animate-pulse rounded-md bg-[#1B2142]/8 motion-reduce:animate-none" />
          </div>
          <div className="h-6 w-20 shrink-0 animate-pulse rounded-full bg-[#1B2142]/10 motion-reduce:animate-none" />
        </div>
      ))}
    </div>
  )
}

function ErrorRetryCard({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <section
      role="alert"
      className="rounded-[20px] border border-[#FECACA] bg-[#FEF2F2] p-4 shadow-[0_4px_16px_rgba(27,33,66,0.06)]"
    >
      <p className="text-[15px] font-extrabold text-[#991B1B]">
        Could not load your reports
      </p>
      <p className="mt-1 text-[13px] leading-snug text-[#7F1D1D]">{message}</p>
      <button
        type="button"
        onClick={onRetry ?? (() => window.location.reload())}
        className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#1B2142] px-5 text-[13px] font-bold text-white motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
      >
        Try again
      </button>
    </section>
  )
}

export function ReportsHomePage({
  user = DEFAULT_USER,
  reports = DEFAULT_REPORTS,
  stats = DEFAULT_STATS,
  againstMeReports = DEFAULT_AGAINST_ME_REPORTS,
  unreadCount = 2,
  isLoading = false,
  error = null,
  onRetry,
}: ReportsHomePageProps) {
  const recentReports = reports.slice(0, 3)

  return (
    <div
      className="min-h-dvh w-full bg-[#FFF7EA] text-[#1B2142] md:flex"
      style={{ fontFamily: 'var(--font-report)' }}
    >
      <BottomNav />

      <div className="min-w-0 flex-1">
        <HomeHeader firstName={user.firstName} unreadCount={unreadCount} />

        <main className="relative flex flex-col gap-4 px-4 pb-[112px] md:gap-6 md:px-8 md:pb-10 lg:px-10">
          {error ? (
            <>
              <UserCard user={user} loading={isLoading} />
              <ErrorRetryCard message={error} onRetry={onRetry} />
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 lg:relative lg:z-10 lg:-mt-[56px] lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-5">
                <div className="lg:col-span-7">
                  <UserCard
                    user={user}
                    loading={isLoading}
                    className="lg:mt-0 lg:h-full"
                  />
                </div>
                <div className="lg:col-span-5">
                  <ReportCta className="lg:h-full" />
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
                <div className="flex flex-col gap-4 lg:col-span-5">
                  <StatsRow stats={stats} loading={isLoading} />

                  {!isLoading ? <VerifiedAlert reports={againstMeReports} /> : null}
                </div>

                <section
                  aria-labelledby="my-reports-heading"
                  className="mt-1 flex flex-col gap-3 lg:col-span-7 lg:mt-0"
                >
                  <div className="flex items-center justify-between px-0.5">
                    <h2
                      id="my-reports-heading"
                      className="text-[18px] font-extrabold tracking-[-0.01em] text-[#1B2142] md:text-[20px]"
                    >
                      My reports
                    </h2>
                    <Link
                      to="/reports"
                      className="inline-flex min-h-[44px] items-center px-1 text-[14px] font-bold text-[#9A3412] motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
                    >
                      View all
                    </Link>
                  </div>

                  {isLoading ? (
                    <ReportsListSkeleton />
                  ) : recentReports.length === 0 ? (
                    <div className="rounded-[22px] bg-white px-5 py-7 text-center shadow-[0_4px_16px_rgba(27,33,66,0.08)]">
                      <p className="text-[14px] leading-relaxed font-semibold text-[#1B2142]/70">
                        No reports yet. Spot a violation? Tap Report a violation
                        above.
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-[#1B2142]/8 overflow-hidden rounded-[22px] bg-white shadow-[0_4px_16px_rgba(27,33,66,0.08)]">
                      {recentReports.map((report) => (
                        <ReportListItem key={report.id} report={report} />
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
