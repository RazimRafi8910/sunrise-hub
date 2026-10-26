import { NavLink } from 'react-router'
import { Icon, type IconName } from './Icon'

function NavIcon({
  name,
  active,
}: {
  name: IconName
  active: boolean
}) {
  const icon = (
    <Icon name={name} size={22} strokeWidth={active ? 1.9 : 1.8} />
  )

  if (active) {
    return (
      <span className="flex h-[30px] w-[48px] items-center justify-center rounded-[15px] bg-amber">
        {icon}
      </span>
    )
  }

  return <span className="flex h-[30px] items-center">{icon}</span>
}

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 z-10 flex h-[84px] w-full max-w-[430px] -translate-x-1/2 items-start justify-between rounded-t-[28px] bg-surface px-4 pb-4 pt-[10px]"
      aria-label="Primary"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex min-h-14 flex-1 flex-col items-center justify-center gap-1 ${
            isActive ? 'text-ink' : 'text-muted'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <NavIcon name="house" active={isActive} />
            <span className={`text-[12px] ${isActive ? 'font-extrabold' : 'font-semibold'}`}>
              Home
            </span>
          </>
        )}
      </NavLink>

      <button
        type="button"
        className="flex min-h-14 flex-1 flex-col items-center justify-center gap-1 border-0 bg-transparent text-muted"
        onClick={() => {}}
      >
        <NavIcon name="wallet" active={false} />
        <span className="text-[12px] font-semibold">Wallet</span>
      </button>

      <button
        type="button"
        className="flex min-h-14 flex-1 flex-col items-center justify-center gap-1 border-0 bg-transparent text-muted"
        onClick={() => {}}
      >
        <NavIcon name="slidersHorizontal" active={false} />
        <span className="text-[12px] font-semibold">Settings</span>
      </button>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex min-h-14 flex-1 flex-col items-center justify-center gap-1 ${
            isActive ? 'text-ink' : 'text-muted'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <NavIcon name="user" active={isActive} />
            <span className={`text-[12px] ${isActive ? 'font-extrabold' : 'font-semibold'}`}>
              Profile
            </span>
          </>
        )}
      </NavLink>
    </nav>
  )
}
