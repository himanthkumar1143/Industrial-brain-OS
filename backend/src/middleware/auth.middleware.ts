import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { env } from "../config/env"
import { User } from "../models/user.model"
import { AuthenticatedRequest } from "../controllers/auth.controller"

/**
 * Verify JWT access token and mount the user payload to Request.
 */
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized, token missing"
      })
      return
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; role: string }
      
      const user = await User.findById(decoded.id)
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Not authorized, user not found"
        })
        return
      }

      req.user = {
        id: (user._id as any).toString(),
        email: user.email,
        role: user.role
      }
      next()
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Not authorized, token invalid or expired"
      })
      return
    }
  } catch (error) {
    next(error)
  }
}

/**
 * Restrict endpoint access to specific authorized user roles.
 */
export const restrictTo = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Access Denied: You do not have permissions for this section"
      })
      return
    }
    next()
  }
}
