import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { RoleChip } from '../../components/RoleChip'
import { useAuthUser } from '../../hooks/useAuth'
import { InfoCard } from './InfoCard'
import { InfoRow } from './InfoRow'
import authClient, { getAuthErrorCodeMsg } from '../../lib/auth-client'
import { useNavigate } from 'react-router'

const DeptName = {
  computer_science:"Computer Science",
  business_management:"Business Management",
}

export function ProfilePage() {
  const { user } = useAuthUser();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const naviate = useNavigate()

  const logOut = async () => {
    setLoading(true)
    try {
      const { data, error } = await authClient.signOut({ callbackURL: '/login' });
      if (error) {
        setErrors(getAuthErrorCodeMsg(error.code));
      }

      if (data.success) {
        naviate('/login', { replace:true});
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2.5">
        <div className="relative size-[104px]">
          <div className="flex size-[104px] items-center justify-center rounded-full border-[5px] border-surface bg-amber text-[12px] font-extrabold tracking-[-0.02em]">
            {user.name}
          </div>
          <button
            type="button"
            aria-label="Change photo"
            className="absolute right-[-14px] bottom-[-6px] flex size-[44px] items-center justify-center rounded-full border-0 bg-surface text-ink"
            onClick={() => {}}
          >
            <Icon name="pencil" size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-[22px] font-extrabold tracking-[-0.01em]">{user.fullName}</h1>
          <RoleChip role={user.role} />
        </div>
      </div>

      <InfoCard
        title="Personal info"
        action={
          <button
            type="button"
            className="min-h-11 border-0 bg-transparent px-1 text-[13px] font-extrabold text-ink"
            onClick={() => {}}
          >
            Edit
          </button>
        }
      >
        <InfoRow icon="user" label="Name" value={user.name} />
        <InfoRow icon="mail" label="Email" value={user.email} />
        {/*<InfoRow icon="phone" label="Phone number" value={user.phone} divider={false} />*/}
      </InfoCard>

      <InfoCard title="College info">
        <InfoRow icon="idCard" label={"Id"} value={user.collegeId} />
        <InfoRow icon="building2" label="Department" value={user.department} />
        <InfoRow
          icon="calendarDays"
          label={"Batch"}
          value={user.classYear}
          divider={false}
        />
      </InfoCard>

      <InfoCard title="Account info">
        <InfoRow icon="shieldCheck" label="What you can do" value={user.role} />
        <InfoRow
          icon="wallet"
          label="Wallet"
          value="Active · online top-up"
          divider={false}
        />
      </InfoCard>

      <button
        type="button"
        className={`flex h-[52px] items-center justify-center gap-2 rounded-button border-0 bg-surface text-[15px] font-extrabold ${loading ?"text-red-400":"text-danger"}`}
        onClick={logOut}
      >
        <Icon name="logOut" size={20} strokeWidth={1.9} />
        {loading ? "Signing Out....":"Sign out"}
      </button>
    </div>
  )
}
