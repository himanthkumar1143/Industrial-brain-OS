import { Router } from "express";
import { JuniorController } from "../controllers/junior.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
const router = Router();

// All routes below are protected and limited to 'junior' role
router.use(protect);
router.use(restrictTo('junior'));

router.get('/dashboard', JuniorController.getDashboard);

export default router;
