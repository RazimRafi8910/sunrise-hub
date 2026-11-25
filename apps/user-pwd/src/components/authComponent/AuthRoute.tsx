import { Navigate, Outlet } from "react-router";
import authClient from "../../lib/auth-client";
import { BottomNav } from "../BottomNav";


export default function AuthProtectRoute() {
  const { data: session, isPending, error } = authClient.useSession()
  if (isPending) return <>Loading...</>; // avoids flashing the login page on refresh
  if (session) {
    console.log('moved to: /')
    return  <Navigate to="/" replace />;
  }
  return (
    <div className="relative mx-auto min-h-dvh max-w-[430px] bg-bg font-sans text-ink">
      <main className="px-5 py-7 pb-[112px]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
