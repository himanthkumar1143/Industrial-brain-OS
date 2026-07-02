import client from "./client"

export interface HealthData {
  status: "healthy" | "unhealthy"
  service: string
  version: string
  environment: string
  uptime: number
  node: string
  mongodb: "connected" | "disconnected"
  neo4j: "connected" | "disconnected"
  timestamp: string
}

export interface HealthResponse {
  success: boolean
  message: string
  data: HealthData
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await client.get<HealthResponse>("/health")
  return response.data
}
