import { Navigate, Outlet, useLocation } from "react-router";
import authClient from "../../lib/auth-client";
import { BottomNav } from "../BottomNav";

export function ProtectedRoute() {
  const { data: session, isPending, error } = authClient.useSession()
  console.log(session)
  console.log(isPending)
  const location = useLocation();

  if (isPending) return <>Loading...</>;
  if ((!session && !isPending) || error) {
    console.log('moved to: /login')
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <div className="relative min-h-dvh bg-bg font-sans text-ink md:flex">
      <BottomNav />
      <main className="min-w-0 flex-1 pb-[112px] md: md: md:pb-10 lg:">
        <Outlet />
      </main>
    </div>
  );
}
