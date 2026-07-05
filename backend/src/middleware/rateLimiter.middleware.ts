import rateLimit from "express-rate-limit"
import { Request, Response } from "express"
import { env } from "../config/env"

/**
 * Login rate limiter middleware.
 * Restricts POST /api/v1/auth/login to a recommended 5 attempts per minute per IP.
 * Returns HTTP 429 with a friendly JSON response.
 */
export const loginLimiter = rateLimit({
  windowMs: env.LOGIN_RATE_LIMIT_WINDOW_MS, // Default: 1 minute (60000ms)
  max: env.LOGIN_RATE_LIMIT_MAX, // Default: 5 attempts
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    // Structured audit logging for rate limited attempt
    const auditLog = {
      timestamp: new Date().toISOString(),
      ip: req.ip || req.socket.remoteAddress || "unknown",
      email: req.body?.email || "unknown",
      action: "LOGIN_RATE_LIMITED",
      result: "FAILURE",
      reason: "Exceeded login attempts rate limit"
    };
    console.warn(`[AUDIT_LOG] ${JSON.stringify(auditLog)}`);

    res.status(429).json({
      success: false,
      message: "Too many login attempts from this IP, please try again after a minute."
    });
  }
});
