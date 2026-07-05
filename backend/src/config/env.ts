import dotenv from "dotenv"
import path from "path"

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") })

export interface EnvConfig {
  PORT: number
  MONGODB_URI: string
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
  GOOGLE_API_KEY: string
  NEO4J_URI: string
  NEO4J_USERNAME: string
  NEO4J_PASSWORD: string
  NODE_ENV: string
  LOGIN_RATE_LIMIT_WINDOW_MS: number
  LOGIN_RATE_LIMIT_MAX: number
}

const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "NEO4J_URI",
  "NEO4J_USERNAME",
  "NEO4J_PASSWORD"
]

const missingVars: string[] = []

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    missingVars.push(key)
  }
}

if (missingVars.length > 0) {
  console.error("\x1b[31m%s\x1b[0m", "=============================================================")
  console.error("\x1b[31m%s\x1b[0m", "CRITICAL CONFIGURATION ERROR: Missing required environment variables!")
  console.error("\x1b[31m%s\x1b[0m", "Please configure the following in your backend/.env file:")
  missingVars.forEach((v) => console.error("\x1b[31m%s\x1b[0m", `  - ${v}`))
  console.error("\x1b[31m%s\x1b[0m", "=============================================================")
  process.exit(1)
}

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  NEO4J_URI: process.env.NEO4J_URI!,
  NEO4J_USERNAME: process.env.NEO4J_USERNAME!,
  NEO4J_PASSWORD: process.env.NEO4J_PASSWORD!,
  NODE_ENV: process.env.NODE_ENV || "development",
  LOGIN_RATE_LIMIT_WINDOW_MS: parseInt(process.env.LOGIN_RATE_LIMIT_WINDOW_MS || "60000", 10),
  LOGIN_RATE_LIMIT_MAX: parseInt(process.env.LOGIN_RATE_LIMIT_MAX || "5", 10)
}
