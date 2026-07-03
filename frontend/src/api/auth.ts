import client from "./client";

export interface LoginResponse {
  success: boolean;
  token: string;
  user: { id: string; email: string; role: 'junior' | 'senior' | 'admin' };
}

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  const { data } = await client.post<LoginResponse>("/auth/login", { email, password });
  return data;
}

export async function getMeApi() {
  const { data } = await client.get("/auth/me");
  return data;
}
