import { useEffect, useState } from 'react'
import { Icon } from '../../components/Icon'
import { RoleChip } from '../../components/RoleChip'
import { useAuthUser } from '../../hooks/useAuth'
import { InfoCard } from './InfoCard'
import { InfoRow } from './InfoRow'
import authClient, { getAuthErrorCodeMsg } from '../../lib/auth-client'
import { useNavigate } from 'react-router'

const DeptName = {
  computer_science: "Computer Science",
  business_management: "Business Management",
}

export function ProfilePage() {
  const { user } = useAuthUser();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const naviate = useNavigate()
  useEffect(() => {
    console.log("ProfilePage mounted");
    return () => console.log("ProfilePage unmounted");
  }, []);
  const logOut = async () => {
    setLoading(true)
    try {
      const { data, error } = await authClient.signOut({ callbackURL: '/login' });
      if (error) {
        setErrors(getAuthErrorCodeMsg(error.code));
      }

      if (data.success) {
        naviate('/login', { replace: true });
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex w-full flex-col gap-4 md:gap-6 p-4 md:px-10 md:py-8">
      <div className="flex flex-col items-center gap-2.5 md:flex-row md:items-center md:gap-5 md:rounded-card md:bg-surface md:p-6">
        <div className="relative size-[104px] shrink-0">
          <div className="flex size-[104px] items-center justify-center rounded-full border-[5px] border-surface bg-amber text-[12px] font-extrabold tracking-[-0.02em] md:border-bg">
            {user.name}
          </div>
          <button
            type="button"
            aria-label="Change photo"
            className="absolute right-[-14px] bottom-[-6px] flex size-[44px] items-center justify-center rounded-full border-0 bg-surface text-ink md:right-[-6px] md:bottom-[-4px] md:bg-bg"
            onClick={() => { }}
          >
            <Icon name="pencil" size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-1.5 md:items-start">
          <h1 className="text-[22px] font-extrabold tracking-[-0.01em] md:text-[26px]">{user.name}</h1>
          <RoleChip role={user.role} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        <InfoCard
          title="Personal info"
          action={
            <button
              type="button"
              className="min-h-11 border-0 bg-transparent px-1 text-[13px] font-extrabold text-ink"
              onClick={() => { }}
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
          <InfoRow icon="building2" label="Department" value={DeptName[user.department]} />
          <InfoRow
            icon="calendarDays"
            label={"Batch"}
            value={user.classYear}
            divider={false}
          />
        </InfoCard>

        <InfoCard title="Account info" className="lg:col-span-2">
          <InfoRow icon="shieldCheck" label="What you can do" value={user.role} />
          <InfoRow
            icon="wallet"
            label="Wallet"
            value="Active · online top-up"
            divider={false}
          />
        </InfoCard>
      </div>

      <div className="flex md:justify-end">
        <button
          type="button"
          className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-button border-0 bg-surface px-8 text-[15px] font-extrabold md:w-auto ${loading ? "text-red-400" : "text-danger"}`}
          onClick={logOut}
        >
          <Icon name="logOut" size={20} strokeWidth={1.9} />
          {loading ? "Signing Out...." : "Sign out"}
        </button>
      </div>
    </div>
  )
}
