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
  console.log(session.id)
  console.log(session.expiresAt)
  useEffect(() => {
    console.log("HomePage mounted");
    return () => console.log("HomePage unmounted");
  }, []);
  return (
    <div className="flex flex-col gap-[22px]">
      <header className="flex items-center gap-3">
        <div className="flex size-[44px] shrink-0 items-center justify-center rounded-full bg-amber">
          <Icon name="sunrise" size={26} strokeWidth={1.9} className="text-ink" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h1 className="text-[17px] font-extrabold tracking-[-0.01em]">
            {greeting}, {user.fullname}
          </h1>
          <p className="text-[13px] text-muted">Welcome to Sunrise Hub</p>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-[44px] shrink-0 items-center justify-center rounded-icon-lg border-0 bg-surface text-ink"
          onClick={() => {}}
        >
          <Icon name="bell" />
          <span className="absolute top-[10px] right-[11px] size-[9px] rounded-full border-2 border-surface bg-alert-dot" />
        </button>
      </header>

      <CampusCard />
      <ServicesGrid />
      <RecentActivity />
    </div>
  )
}
