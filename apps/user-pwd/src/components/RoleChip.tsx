import { getRoleCopy, type AppRole } from '../mocks/user'

export function RoleChip({ role }: { role: AppRole }) {
  return (
    <span className="rounded-pill bg-ink px-3 py-[5px] text-[12px] font-bold text-surface">
      {getRoleCopy(role).label}
    </span>
  )
}
