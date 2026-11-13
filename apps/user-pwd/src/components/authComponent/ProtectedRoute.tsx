import { Navigate, Outlet, useLocation } from "react-router";
// import { useSession } from "../../hooks/useAuth";
import authClient from "../../lib/auth-client";
import { BottomNav } from "../BottomNav";

export function ProtectedRoute() {
  const { data: session, isPending, error } = authClient.useSession()
  // const { } = useSession()
  const location = useLocation();

  if (isPending) return <>Loading...</>; // avoids flashing the login page on refresh
  if (!session || error) return <Navigate to="/login" state={{ from: location }} replace />;
  return (
    <div className="relative mx-auto min-h-dvh max-w-[430px] bg-bg font-sans text-ink">
      <main className="px-5 py-7 pb-[112px]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
