import neo4j, { Driver } from "neo4j-driver"
import { env } from "./env"

let driver: Driver | null = null

export function getNeo4jDriver(): Driver {
  if (!driver) {
    driver = neo4j.driver(
      env.NEO4J_URI,
      neo4j.auth.basic(env.NEO4J_USERNAME, env.NEO4J_PASSWORD)
    )
  }
  return driver
}

export async function connectNeo4j(): Promise<Driver> {
  try {
    const neoDriver = getNeo4jDriver()
    // Verifying driver connectivity and credentials
    await neoDriver.verifyConnectivity()
    console.log("[Neo4j] Connected and verified connectivity successfully")
    return neoDriver
  } catch (error) {
    console.error("[Neo4j] Connectivity verification failed:", error)
    throw error
  }
}

export async function closeNeo4j(): Promise<void> {
  if (driver) {
    await driver.close()
    console.log("[Neo4j] Closed connection driver")
    driver = null
  }
}
