import app from "./app"
import { env } from "./config/env"
import { connectMongoDB, disconnectMongoDB } from "./config/mongodb"
import { connectNeo4j, closeNeo4j } from "./config/neo4j"

const PORT = env.PORT

// Start the Express HTTP server
const server = app.listen(PORT, async () => {
  console.log(`[Server] Running in ${env.NODE_ENV} mode on port ${PORT}`)

  // Attempt MongoDB Atlas connection on startup
  try {
    await connectMongoDB()
  } catch (error) {
    console.warn("[MongoDB] Startup database connection failed. Server remains operational.")
  }

  // Attempt Neo4j AuraDB connectivity check on startup
  try {
    await connectNeo4j()
  } catch (error) {
    console.warn("[Neo4j] Startup database verification failed. Server remains operational.")
  }
})

/**
 * Handles cleaning up connections and shutting down gracefully.
 */
const handleShutdown = async () => {
  console.log("\n[Server] Shutdown signal received. Closing connections...")
  server.close(async () => {
    console.log("[Server] Express HTTP gateway terminated.")
    await disconnectMongoDB()
    await closeNeo4j()
    console.log("[Server] Graceful shutdown completed. Exiting.")
    process.exit(0)
  })
}

process.on("SIGTERM", handleShutdown)
process.on("SIGINT", handleShutdown)
export default server
