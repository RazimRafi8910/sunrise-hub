// components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router";
import { useSession } from "../../hooks/useAuth";

export function ProtectedRoute() {
  const { data: session, isPending } = useSession();
  const location = useLocation();

  if (isPending) return <>Loading...</>; // avoids flashing the login page on refresh
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}
