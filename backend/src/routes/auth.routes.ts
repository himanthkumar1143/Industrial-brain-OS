import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { loginLimiter } from "../middleware/rateLimiter.middleware";

const router = Router();

// Public route for login with brute-force rate limit protection
router.post("/login", loginLimiter, AuthController.login);

// Protected routes
router.get("/logout", protect, AuthController.logout);
router.get("/me", protect, AuthController.getMe);

export default router;
