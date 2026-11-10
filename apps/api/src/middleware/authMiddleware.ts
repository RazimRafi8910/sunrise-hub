import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '@sunrise-hub/shared';
import { ERROR_CODES } from '@sunrise-hub/shared';
import { fromNodeHeaders } from 'better-auth/node';
import ApiError from '../lib/apiError.js';
import auth from '../lib/auth.js';

export async function requireAuth(req:Request, res:Response, next:NextFunction) {
  try {
    const result = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    if (!result) {
      return next(new ApiError(ERROR_CODES.NOT_AUTHENTICATED, "user not authenticated"));
    }

    console.log(result);

    req.user = result?.user;
    req.session = result?.session;
    next();
  } catch (err) {
    console.error(err);
    next(err)
  }
}


export function requireRole(...permitRole:UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestUserRole = req.user?.role;
    if (!requestUserRole) {
      return next(new ApiError(ERROR_CODES.NOT_AUTHENTICATED, "user not authencated"));
    }

    const allowed = permitRole.some((role) => requestUserRole === role);

    if (!allowed) {
      return next(new ApiError(ERROR_CODES.UNAUTHORIZED, "user dont have permission"));
    }

    next()
  }
}
