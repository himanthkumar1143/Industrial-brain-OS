import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import apiRouter from "./routes"
import { notFound } from "./middleware/notFound"
import { errorHandler } from "./middleware/errorHandler"

const app = express()

// 1. Security Headers Configuration
app.use(helmet())

// 2. Cross-Origin Resource Sharing Setup
app.use(
  cors({
    origin: "*", // Can be configured with allowed domain lists in production
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"]

  })
)

// 3. Dev Request Logging Configuration
app.use(morgan("dev"))

// 4. Request Body Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 5. Versioned API Router Registration
app.use("/api/v1", apiRouter)

// 6. 404 Fallback Middleware
app.use(notFound)

// 7. Global Exception Handler
app.use(errorHandler)

export default app
