import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

// All routes below are protected and limited to 'admin' role
router.use(protect);
router.use(restrictTo('admin'));

router.get('/dashboard', AdminController.getDashboard);

export default router;
