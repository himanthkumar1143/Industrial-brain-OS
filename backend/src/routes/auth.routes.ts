import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Public route for login
router.post("/login", AuthController.login);

// Protected routes
router.get("/logout", protect, AuthController.logout);
router.get("/me", protect, AuthController.getMe);

export default router;
