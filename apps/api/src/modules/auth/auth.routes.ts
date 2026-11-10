import { Router } from "express";
import type {Request ,Response} from 'express'

const router = Router()


router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: "working" })
});
//
// router.post('/login')
// router.get('/me')
// router.post('/signup')
// router.get('/logout')

export default router;
