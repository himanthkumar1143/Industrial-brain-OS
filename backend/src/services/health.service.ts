import mongoose from "mongoose"
import { getNeo4jDriver } from "../config/neo4j"

export interface HealthStatusResult {
  mongodb: "connected" | "disconnected"
  neo4j: "connected" | "disconnected"
}

export class HealthService {
  /**
   * Retrieves the current connectivity status of MongoDB and Neo4j databases.
   */
  public static async getConnectionsStatus(): Promise<HealthStatusResult> {
    let mongodbStatus: "connected" | "disconnected" = "disconnected"
    let neo4jStatus: "connected" | "disconnected" = "disconnected"

    // 1. Verify MongoDB Mongoose state (1 = connected)
    if (mongoose.connection.readyState === 1) {
      mongodbStatus = "connected"
    }

    // 2. Verify Neo4j connectivity
    try {
      const driver = getNeo4jDriver()
      await driver.verifyConnectivity()
      neo4jStatus = "connected"
    } catch (error) {
      mongodbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected"
      neo4jStatus = "disconnected"
    }

    return {
      mongodb: mongodbStatus,
      neo4j: neo4jStatus
    }
  }
}
