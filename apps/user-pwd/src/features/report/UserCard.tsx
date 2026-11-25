import type { Role, User } from './types'

export interface UserCardProps {
  user?: User
  loading?: boolean
  className?: string
}

const ROLE_STYLES: Record<Role, string> = {
  Student: 'bg-[#ECEAFE] text-[#1B2142]',
  Faculty: 'bg-[#E0F2FE] text-[#0C4A6E]',
  Staff: 'bg-[#F1F5F9] text-[#1E293B]',
  Reviewer: 'bg-[#DCFCE7] text-[#14532D]',
  Coordinator: 'bg-[#FEF3C7] text-[#78350F]',
}

export function UserCard({ user, loading = false, className = '' }: UserCardProps) {
  if (loading || !user) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading profile"
        className={`relative z-10 -mt-[56px] flex items-center gap-3.5 rounded-[22px] bg-white p-4 shadow-[0_4px_16px_rgba(27,33,66,0.08)] md:p-5 ${className}`}
      >
        <div className="size-[52px] shrink-0 animate-pulse rounded-full bg-[#1B2142]/10 motion-reduce:animate-none" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="h-4 w-32 animate-pulse rounded-md bg-[#1B2142]/12 motion-reduce:animate-none" />
          <div className="h-3.5 w-44 animate-pulse rounded-md bg-[#1B2142]/8 motion-reduce:animate-none" />
        </div>
        <div className="h-7 w-18 shrink-0 animate-pulse rounded-full bg-[#1B2142]/10 motion-reduce:animate-none" />
      </div>
    )
  }

  return (
    <section
      aria-label="User summary"
      className={`relative z-10 -mt-[56px] flex items-center gap-3.5 rounded-[22px] bg-white p-4 shadow-[0_4px_16px_rgba(27,33,66,0.08)] md:p-5 ${className}`}
    >
      <div
        aria-hidden="true"
        className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#FDE4B8] text-[17px] font-extrabold tracking-[-0.01em] text-[#1B2142]"
      >
        {user.initials}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[17px] font-extrabold leading-snug text-[#1B2142]">
          {user.fullName}
        </p>
        <p className="mt-0.5 text-[13px] font-normal leading-snug text-[#1B2142]/65">
          {user.course} · {user.year}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-bold leading-none ${ROLE_STYLES[user.role]}`}
      >
        {user.role}
      </span>
    </section>
  )
}
