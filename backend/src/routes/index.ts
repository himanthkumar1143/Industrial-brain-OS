import { Router } from "express"
import healthRouter from "./health.routes"
import authRouter from "./auth.routes"
import juniorRouter from "./junior.routes"
import seniorRouter from "./senior.routes"
import adminRouter from "./admin.routes"

const router = Router()

// Attach individual route modules under versioned endpoints
router.use("/health", healthRouter)
router.use("/auth", authRouter)
router.use("/junior", juniorRouter)
router.use("/senior", seniorRouter)
router.use("/admin", adminRouter)

// Future extension routes mapping placeholder:
// router.use("/users", usersRouter)
// router.use("/documents", documentsRouter)
// router.use("/copilot", copilotRouter)
// router.use("/knowledge", knowledgeRouter)
// router.use("/compliance", complianceRouter)
// router.use("/graph", graphRouter)

export default router
