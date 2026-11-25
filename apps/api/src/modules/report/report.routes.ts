import express from "express";
import { requireAuth, requireRole } from "../../middleware/authMiddleware.js";
import { getAllReport, getReport } from "./report.controller.js";


const router = express.Router()

router.get('/:id', requireAuth, requireRole("faculty", "staff", "admin"), getReport);
//create report
router.post('/', requireAuth, getAllReport);


export default router;
