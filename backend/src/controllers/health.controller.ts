import { Request, Response, NextFunction } from "express"
import { HealthService } from "../services/health.service"
import { env } from "../config/env"

export class HealthController {
  /**
   * Retrieves system health status metrics.
   */
  public static async getHealth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dbStatus = await HealthService.getConnectionsStatus()
      
      // The overall status is healthy only if both databases are connected
      const isHealthy = dbStatus.mongodb === "connected" && dbStatus.neo4j === "connected"
      
      // We return 200 OK so that the frontend can safely parse the response and show specific failures on UI
      res.status(200).json({
        success: true,
        message: "Health check completed successfully",
        data: {
          status: isHealthy ? "healthy" : "unhealthy",
          service: "Industrial Brain OS Backend",
          version: "1.0.0",
          environment: env.NODE_ENV,
          uptime: Math.floor(process.uptime()),
          node: process.version,
          mongodb: dbStatus.mongodb,
          neo4j: dbStatus.neo4j,
          timestamp: new Date().toISOString()
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
