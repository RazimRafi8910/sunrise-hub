import type { NextFunction, Request, Response } from 'express'
import z from 'zod'
import ApiError from '../lib/apiError.js'
import { ERROR_CODES } from '@sunrise-hub/shared'

export const RequestbodyValidator = (schema: z.ZodAny) => (req:Request, _res:Response, next:NextFunction) => {
  const result = z.safeParse(schema, req.body);

  if (!result.success && result.error) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    console.log("[middleware validator error]", errors);
    const errorMessage = `Invalid request body: ${errors}`;
    return next(new ApiError(ERROR_CODES.BAD_REQUEST, errorMessage));
  }

  req.body = result.data;
  next();
}
