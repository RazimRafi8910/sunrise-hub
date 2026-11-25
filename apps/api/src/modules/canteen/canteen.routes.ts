import express from 'express';
import { healthController } from '../shared/health/controller.js';
import prisma from '../../lib/prisma.js';

const router = express.Router()


router.get('/health', healthController("canteen", {
  postgresql: () => prisma.$queryRaw`SELECT 1`,
}));


//router.get('/menu')



export default router;
