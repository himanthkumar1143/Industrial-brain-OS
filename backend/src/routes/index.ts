import { Router } from "express"
import healthRouter from "./health.routes"

const router = Router()

// Attach individual route modules under versioned endpoints
router.use("/health", healthRouter)

// Future extension routes mapping placeholder:
// router.use("/auth", authRouter)
// router.use("/users", usersRouter)
// router.use("/documents", documentsRouter)
// router.use("/copilot", copilotRouter)
// router.use("/knowledge", knowledgeRouter)
// router.use("/compliance", complianceRouter)
// router.use("/graph", graphRouter)

export default router
