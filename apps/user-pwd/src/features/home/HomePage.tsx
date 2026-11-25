import { useEffect } from 'react'
import { Icon } from '../../components/Icon'
import { useAuthUser } from '../../hooks/useAuth'
import { CampusCard } from './CampusCard'
import { RecentActivity } from './RecentActivity'
import { ServicesGrid } from './ServicesGrid'

function greetingLabel(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function HomePage() {
  const greeting = greetingLabel(new Date().getHours())
  const { user,session } = useAuthUser();
  useEffect(() => {
    console.log("HomePage mounted");
    return () => console.log("HomePage unmounted");
  }, []);
  return (
    <div className="flex w-full flex-col gap-5 md:gap-6">
      <header className="relative -mx-5 -mt-7 overflow-hidden rounded-b-[28px] bg-[#1B2142] px-5 pt-[max(20px,env(safe-area-inset-top))] pb-[88px] text-white md:-mx-8 md:-mt-8 md:rounded-b-[32px] md:px-8 md:pt-7 md:pb-[92px] lg:-mx-10 lg:px-10">
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
          <div className="flex items-center gap-3">
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
                Campus portal
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex size-11 shrink-0 items-center justify-center rounded-full border-0 bg-white/12 text-white motion-safe:transition-transform motion-safe:active:scale-[0.98]"
            onClick={() => {}}
          >
            <Icon name="bell" size={20} />
            <span className="absolute top-[10px] right-[11px] size-[9px] rounded-full border-2 border-[#1B2142] bg-[#FFB020]" />
          </button>
        </div>

        <div className="relative z-10 mt-6 md:mt-7">
          <p className="text-[15px] font-normal text-white/75 md:text-[16px]">
            {greeting}
          </p>
          <h1 className="mt-0.5 text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white md:text-[34px]">
            Hi, {user.fullname}
          </h1>
        </div>
      </header>

      <div className="relative z-10 -mt-[76px] md:-mt-[80px]">
        <CampusCard user={{name:user.name,collegeId:user.collegeId,role:user.role}} />
      </div>

      <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-12 lg:items-start lg:gap-6">
        <div className="lg:col-span-7">
          <ServicesGrid />
        </div>
        <div className="lg:col-span-5">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
