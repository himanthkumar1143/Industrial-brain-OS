import { Request, Response, NextFunction, RequestHandler } from "express"

/**
 * Wraps async express routes to catch errors and forward them to the global handler.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
