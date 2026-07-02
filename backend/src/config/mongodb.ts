import mongoose from "mongoose"
import { env } from "./env"

export async function connectMongoDB(): Promise<typeof mongoose> {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI)
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error("[MongoDB] Connection failed:", error)
    throw error
  }
}

export async function disconnectMongoDB(): Promise<void> {
  try {
    await mongoose.disconnect()
    console.log("[MongoDB] Disconnected successfully")
  } catch (error) {
    console.error("[MongoDB] Error during disconnection:", error)
  }
}
