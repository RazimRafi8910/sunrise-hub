import type { AuthSession, AuthUser } from './app.d.ts';

declare global {
  namespace Express {
    interface Request {
      user?:AuthUser,
      session?:AuthSession,
    }
  }
}
