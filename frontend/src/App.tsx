import { useQuery } from "@tanstack/react-query"
import { getHealth } from "./api/health"
import { Server, Database, ShieldAlert, Loader2, CheckCircle2, XCircle, RefreshCw } from "lucide-react"

function App() {
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
  })

  // Determine backend status based on loading state, error, or data success
  const getBackendStatus = () => {
    if (isLoading) return "loading"
    if (error || !data?.success) return "failed"
    return "connected"
  }

  // Determine db status
  const getDbStatus = (type: "mongodb" | "neo4j") => {
    if (isLoading) return "loading"
    if (error || !data?.success) return "failed"
    return data.data[type] === "connected" ? "connected" : "failed"
  }

  const backendStatus = getBackendStatus()
  const mongoStatus = getDbStatus("mongodb")
  const neo4jStatus = getDbStatus("neo4j")

  const renderBadge = (status: "loading" | "connected" | "failed") => {
    switch (status) {
      case "loading":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Loading
          </span>
        )
      case "connected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Connected
          </span>
        )
      case "failed":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.15)]">
            <XCircle className="h-3.5 w-3.5" />
            Failed
          </span>
        )
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0f] text-slate-100 overflow-hidden px-4 select-none">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Content */}
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-primary/10 border border-primary/20 shadow-inner mb-4 transition-transform hover:scale-105 duration-300">
            <Server className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Industrial Brain OS
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Sprint 0 Foundation Diagnostics
          </p>
        </div>

        {/* Diagnostic Card */}
        <div className="backdrop-blur-md bg-card/60 border border-border rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
            <span className="text-sm font-semibold text-slate-300">System Integrity</span>
            <button
              onClick={() => refetch()}
              disabled={isRefetching}
              className="p-1.5 rounded-lg border border-border bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-50"
              title="Force Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Backend API Service */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/40 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Backend API</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Express Gateway</p>
                </div>
              </div>
              {renderBadge(backendStatus)}
            </div>

            {/* MongoDB Atlas Service */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/40 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">MongoDB Atlas</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Document Database</p>
                </div>
              </div>
              {renderBadge(mongoStatus)}
            </div>

            {/* Neo4j AuraDB Service */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/40 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Neo4j AuraDB</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Knowledge Graph</p>
                </div>
              </div>
              {renderBadge(neo4jStatus)}
            </div>
          </div>

          {/* Runtime Details Metadata */}
          {data?.success && data.data && (
            <div className="mt-6 pt-4 border-t border-border/50 text-[11px] text-slate-500 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Environment:</span>
                <span className="text-slate-300 font-medium">{data.data.environment}</span>
              </div>
              <div className="flex justify-between">
                <span>Node Engine:</span>
                <span className="text-slate-300 font-medium">{data.data.node}</span>
              </div>
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="text-slate-300 font-medium">v{data.data.version}</span>
              </div>
              <div className="flex justify-between">
                <span>Server Uptime:</span>
                <span className="text-slate-300 font-medium">{data.data.uptime}s</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-slate-500 mt-6 font-mono tracking-wider">
          INDUSTRIAL BRAIN OS • SPRINT 0 FOUNDATION
        </p>
      </div>
    </div>
  )
}

export default App
