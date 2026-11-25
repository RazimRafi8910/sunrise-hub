import { Link, useLocation } from 'react-router'
import { Icon, type IconName } from './Icon'

function NavIcon({
  name,
  active,
}: {
  name: IconName
  active: boolean
}) {
  const icon = <Icon name={name} size={20} strokeWidth={active ? 2 : 1.8} />

  return (
    <span
      className={`flex h-8 w-14 items-center justify-center rounded-full ${
        active ? 'bg-[#FFE3A8] text-[#1B2142]' : 'bg-transparent'
      }`}
    >
      {icon}
    </span>
  )
}

function isReportRoute(pathname: string): boolean {
  return (
    pathname === '/report' ||
    pathname === '/reports' ||
    pathname.startsWith('/reports/') ||
    pathname === '/rules' ||
    pathname === '/notifications'
  )
}

export function BottomNav() {
  const { pathname } = useLocation()
  const isHomeActive = pathname === '/'
  const isReportActive = isReportRoute(pathname)
  const isProfileActive = pathname === '/profile'

  return (
    <>
      {/* Mobile bottom navigation */}
      <nav
        className="fixed right-0 bottom-0 left-0 z-20 flex w-full items-center justify-around border-t border-[#1B2142]/10 bg-white px-2 pt-2 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden"
        aria-label="Primary"
      >
        <Link
          to="/"
          aria-current={isHomeActive ? 'page' : undefined}
          className={`flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142] ${
            isHomeActive ? 'text-[#1B2142]' : 'text-[#1B2142]/65'
          }`}
        >
          <NavIcon name="house" active={isHomeActive} />
          <span
            className={`text-[12px] leading-none ${
              isHomeActive ? 'font-extrabold text-[#1B2142]' : 'font-semibold'
            }`}
          >
            Home
          </span>
        </Link>

        <Link
          to="/report"
          aria-current={isReportActive ? 'page' : undefined}
          className={`flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142] ${
            isReportActive ? 'text-[#1B2142]' : 'text-[#1B2142]/65'
          }`}
        >
          <NavIcon name="shieldAlert" active={isReportActive} />
          <span
            className={`text-[12px] leading-none ${
              isReportActive ? 'font-extrabold text-[#1B2142]' : 'font-semibold'
            }`}
          >
            Report
          </span>
        </Link>

        {/* Wallet hidden until page is implemented */}

        <button
          type="button"
          className="flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1 rounded-xl border-0 bg-transparent py-1 text-[#1B2142]/65 motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
          onClick={() => {}}
        >
          <NavIcon name="slidersHorizontal" active={false} />
          <span className="text-[12px] leading-none font-semibold">Settings</span>
        </button>

        <Link
          to="/profile"
          aria-current={isProfileActive ? 'page' : undefined}
          className={`flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 motion-safe:transition-transform motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142] ${
            isProfileActive ? 'text-[#1B2142]' : 'text-[#1B2142]/65'
          }`}
        >
          <NavIcon name="user" active={isProfileActive} />
          <span
            className={`text-[12px] leading-none ${
              isProfileActive ? 'font-extrabold text-[#1B2142]' : 'font-semibold'
            }`}
          >
            Profile
          </span>
        </Link>
      </nav>

      {/* Desktop sidebar navigation */}
      <aside className="hidden md:sticky md:top-0 md:flex md:h-dvh md:w-[240px] md:shrink-0 md:flex-col md:border-r md:border-[#1B2142]/10 md:bg-white md:px-4 md:py-7">
        <div className="mb-8 flex items-center gap-3 px-2">
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
            <p className="truncate text-[16px] font-extrabold leading-tight tracking-[-0.01em] text-[#1B2142]">
              Sunrise Hub
            </p>
            <p className="text-[12px] font-medium text-[#1B2142]/65">Campus portal</p>
          </div>
        </div>

        <nav aria-label="Primary sidebar" className="flex flex-1 flex-col gap-1.5">
          <Link
            to="/"
            aria-current={isHomeActive ? 'page' : undefined}
            className={`flex min-h-[48px] items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142] ${
              isHomeActive
                ? 'bg-[#FFE3A8] font-extrabold text-[#1B2142]'
                : 'font-semibold text-[#1B2142]/65 hover:bg-[#FFF7EA] hover:text-[#1B2142]'
            }`}
          >
            <Icon name="house" size={20} strokeWidth={isHomeActive ? 2.1 : 1.8} />
            <span>Home</span>
          </Link>

          <Link
            to="/report"
            aria-current={isReportActive ? 'page' : undefined}
            className={`flex min-h-[48px] items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142] ${
              isReportActive
                ? 'bg-[#FFE3A8] font-extrabold text-[#1B2142]'
                : 'font-semibold text-[#1B2142]/65 hover:bg-[#FFF7EA] hover:text-[#1B2142]'
            }`}
          >
            <Icon name="shieldAlert" size={20} strokeWidth={isReportActive ? 2.1 : 1.8} />
            <span>Report</span>
          </Link>

          {/* Wallet hidden until page is implemented */}

          <button
            type="button"
            className="flex min-h-[48px] items-center gap-3 rounded-2xl border-0 bg-transparent px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#1B2142]/65 transition-colors hover:bg-[#FFF7EA] hover:text-[#1B2142] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142]"
            onClick={() => {}}
          >
            <Icon name="slidersHorizontal" size={20} strokeWidth={1.8} />
            <span>Settings</span>
          </button>

          <Link
            to="/profile"
            aria-current={isProfileActive ? 'page' : undefined}
            className={`flex min-h-[48px] items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2142] ${
              isProfileActive
                ? 'bg-[#FFE3A8] font-extrabold text-[#1B2142]'
                : 'font-semibold text-[#1B2142]/65 hover:bg-[#FFF7EA] hover:text-[#1B2142]'
            }`}
          >
            <Icon name="user" size={20} strokeWidth={isProfileActive ? 2.1 : 1.8} />
            <span>Profile</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
