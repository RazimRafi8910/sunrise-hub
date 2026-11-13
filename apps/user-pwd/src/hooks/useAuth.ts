// hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "../lib/api";
import type { Session, SessionInfo } from "@sunrise-hub/shared";
import authClient from "../lib/auth-client";
import type {User} from '@sunrise-hub/shared'


export function useAuthUser(): { user: User, session: SessionInfo, isPending:boolean } {
  const { data: { user, session }, error, isPending, refetch } = authClient.useSession();
  if (!user) {
      throw new Error("useAuthUser must be used inside a protected route");
  }

  return { user, session, error, isPending, refetch }
}

//type Session = { user: { id: string; name: string; email: string }; session: { id: string } };
const SESSION_KEY = ["session"];

export function useSession() {
  return useQuery({
    queryKey: SESSION_KEY,
    queryFn: async () => {
      try {
        return  authClient.useSession()
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) return null; // logged out is a valid state, not an error
        throw e;
      }
    },
    staleTime: 5 * 60_000,
    retry: false,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      api<Session>("/login", { method: "POST", body: JSON.stringify(body) }),
    onSuccess: (data) => qc.setQueryData(SESSION_KEY, data), // no extra round trip
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api("/logout", { method: "POST" }),
    onSuccess: () => {
      qc.setQueryData(SESSION_KEY, null);
      qc.removeQueries({ predicate: (q) => q.queryKey[0] !== "session" }); // drop other users' cached data
    },
  });
}
