import { Link } from 'react-router'

export interface HomeHeaderProps {
  firstName: string
  unreadCount: number
  greeting?: string
}

function getGreetingByHour(hour: number): string {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function HomeHeader({
  firstName,
  unreadCount,
  greeting,
}: HomeHeaderProps) {
  const greetingText = greeting ?? getGreetingByHour(new Date().getHours())
  const badgeText = unreadCount > 9 ? '9+' : String(unreadCount)
  const bellLabel =
    unreadCount > 0
      ? `Notifications, ${unreadCount} unread`
      : 'Notifications'

  return (
    <header className="relative overflow-hidden rounded-b-[28px] bg-[#1B2142] px-5 pt-[max(14px,env(safe-area-inset-top))] pb-[84px] text-white md:rounded-b-[32px] md:px-8 md:pt-5 md:pb-[90px] lg:px-10">
      {/* Decorative peeking half-sun in the bottom-right corner */}
      <svg
        aria-hidden="true"
        viewBox="0 0 180 140"
        fill="none"
        className="pointer-events-none absolute -right-3 bottom-0 h-[132px] w-[170px] select-none md:right-2 md:h-[156px] md:w-[200px]"
      >
        <g stroke="#FFB020" strokeWidth="4.5" strokeLinecap="round" opacity="0.85">
          <line x1="112" y1="22" x2="112" y2="38" />
          <line x1="72" y1="32" x2="80" y2="46" />
          <line x1="40" y1="58" x2="54" y2="68" />
          <line x1="26" y1="96" x2="42" y2="99" />
          <line x1="148" y1="30" x2="141" y2="44" />
        </g>
        <circle cx="116" cy="116" r="56" fill="#FFB020" />
        <circle cx="116" cy="116" r="38" fill="#F47B2A" opacity="0.9" />
      </svg>

      <div className="relative z-10 flex items-center justify-between gap-3">
        <Link
          to="/"
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
          Back to Home
        </Link>

        <Link
          to="/notifications"
          aria-label={bellLabel}
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white/12 text-white motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          {unreadCount > 0 ? (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFB020] px-1 text-[11px] font-extrabold leading-none text-[#1B2142]">
              {badgeText}
            </span>
          ) : null}
        </Link>
      </div>

      <div className="relative z-10 mt-2 flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FFB020]"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none">
            <path d="M6.5 14.5a5.5 5.5 0 0 1 11 0H6.5Z" fill="#1B2142" />
            <rect x="4.5" y="15.5" width="15" height="2" rx="1" fill="#1B2142" />
          </svg>
        </div>

        <div className="min-w-0">
          <p className="text-[17px] font-extrabold leading-tight tracking-[-0.01em] text-white">
            Sunrise Hub
          </p>
          <p className="text-[13px] font-normal leading-tight text-white/70">
            Reports
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-4 md:mt-5">
        <p className="text-[15px] font-normal text-white/75 md:text-[16px]">
          {greetingText}
        </p>
        <h1 className="mt-0.5 text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white md:text-[34px]">
          Hi, {firstName}
        </h1>
      </div>
    </header>
  )
}
