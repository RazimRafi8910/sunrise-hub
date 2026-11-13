import { Router } from "express";
import { requestbodyValidator } from '../../middleware/validator.js';
import type {Request ,Response} from 'express'
import { loginSchema, signupSchema } from "./auth.validation.js";
import { getUserController, loginController, signupController } from "./auth.controller.js";

const router = Router()


router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: "working" })
});

router.post('/signup', requestbodyValidator(signupSchema), signupController);
router.post('/login', requestbodyValidator(loginSchema), loginController);
router.get('/me',getUserController)
// router.post('/login')
// router.get('/me')
// router.post('/signup')
// router.get('/logout')

export default router;
