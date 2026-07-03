import { Router } from "express";
import { SeniorController } from "../controllers/senior.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

// Protect all routes and restrict to senior role
router.use(protect);
router.use(restrictTo('senior'));

router.get('/dashboard', SeniorController.getDashboard);

export default router;
