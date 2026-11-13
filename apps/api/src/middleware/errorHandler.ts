import type { NextFunction, Request, Response } from 'express';
import { ERROR_CODES } from '@sunrise-hub/shared';
import ApiError from '../lib/apiError.js';

function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(`[error handler ]error on ${req.url} message: ${err.message}`)
  if (err instanceof ApiError) {
    console.log(err)
    const response = {
      success: false,
      error: {
        message: err.message,
        code: err.code,
        details: err.details ?? []
      }
    }
    return res.status(err.status).json(response);
  }
  console.error(err);
  return res.status(500).json({ success: false, error: { message: "internal server error", code: ERROR_CODES.INTERNAL_ERROR } });
}


function handleNotFound(req: Request, res: Response, next: NextFunction) {
  console.log(`request: ${req.baseUrl} from: ${req.ip}`)
  return res.status(404).json({message:"url not found",code:"",url:req.originalUrl})
}

export { handleNotFound, handleError };
