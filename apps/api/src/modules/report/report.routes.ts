import express from "express";
import { requireAuth, requireRole } from "../../middleware/authMiddleware.js";
import { getAllReport, getReport } from "./controller/report.js";
import { createRule, getAllRules } from "./controller/rules.js";

const router = express.Router()

router.get('/rules', requireAuth, getAllRules);
router.post('/rules', requireAuth, requireRole("faculty", "staff", "admin"), createRule);
router.get('/:id', requireAuth, requireRole("faculty", "staff", "admin"), getReport);
//create report
router.post('/', requireAuth, getAllReport);


export default router;
