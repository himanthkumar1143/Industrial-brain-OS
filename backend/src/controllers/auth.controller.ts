import { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/auth.service"

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export class AuthController {
  /**
   * Log in user and return JWT.
   */
  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
   
    try {
      const { email, password } = req.body

      if (!email || !password) {
        console.warn(`[AUDIT_LOG] ${JSON.stringify({
          timestamp: new Date().toISOString(),
          ip: req.ip || req.socket.remoteAddress || "unknown",
          email: email || "unknown",
          action: "LOGIN_ATTEMPT",
          result: "FAILURE",
          reason: "Email and password are required"
        })}`)

        res.status(400).json({
          success: false,
          message: "Email and password are required"
        })
        return
      }

      const payload = await AuthService.login(email, password)

      console.info(`[AUDIT_LOG] ${JSON.stringify({
        timestamp: new Date().toISOString(),
        ip: req.ip || req.socket.remoteAddress || "unknown",
        email: payload.user.email,
        role: payload.user.role,
        action: "LOGIN_SUCCESS",
        result: "SUCCESS"
      })}`)

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: payload
      })
    } catch (error: any) {
      console.warn(`[AUDIT_LOG] ${JSON.stringify({
        timestamp: new Date().toISOString(),
        ip: req.ip || req.socket.remoteAddress || "unknown",
        email: req.body?.email || "unknown",
        action: "LOGIN_FAILURE",
        result: "FAILURE",
        reason: error?.message || "Invalid email or password"
      })}`)
      next(error)
    }
  }

  /**
   * Log out user (informational endpoint).
   */
  public static async logout(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.user) {
        console.info(`[AUDIT_LOG] ${JSON.stringify({
          timestamp: new Date().toISOString(),
          ip: req.ip || req.socket.remoteAddress || "unknown",
          email: req.user.email,
          role: req.user.role,
          action: "LOGOUT",
          result: "SUCCESS"
        })}`)
      }
      res.status(200).json({
        success: true,
        message: "Logout successful"
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Retrieve active user session profile.
   */
  public static async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Not authenticated"
        })
        return
      }

      res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        data: {
          user: req.user
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
