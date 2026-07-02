import { Request, Response, NextFunction } from "express"

interface HttpError extends Error {
  statusCode?: number
}

/**
 * Middleware to handle unmatched routes (404 Not Found).
 */
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error: HttpError = new Error(`Route Not Found - ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}
