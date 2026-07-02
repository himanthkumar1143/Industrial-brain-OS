import { Request, Response, NextFunction } from "express"
import { env } from "../config/env"

export interface AppError extends Error {
  statusCode?: number
  errors?: any[]
}

/**
 * Global centralized error handling middleware.
 */
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  console.error(`[Error] ${statusCode} - ${message}`)
  if (err.stack && env.NODE_ENV !== "production") {
    console.error(err.stack)
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || (env.NODE_ENV !== "production" ? [err.stack] : [])
  })
}
