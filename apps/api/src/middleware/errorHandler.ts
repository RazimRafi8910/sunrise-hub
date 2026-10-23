import type { NextFunction , Request, Response } from 'express';

function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err) {

  }

  return res.status(500).json({ message: "Internal server error" });
}


function handleNotFound(req: Request, res: Response, next: NextFunction) {
  return res.status(404).json({ message: "url not found" });
}
