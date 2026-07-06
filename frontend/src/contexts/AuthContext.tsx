import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { loginApi, getMeApi } from "../api/auth";
import client from "../api/client";

export type AuthProviderType = "local" | "google" | "microsoft" | "azure-ad" | "saml" | "ldap";

export interface AuthSessionMeta {
  provider: AuthProviderType;
  mfaVerified?: boolean;
  expiresAt?: number;
}

export interface User {
  id: string;
  email: string;
  role: "junior" | "senior" | "admin";
}

export interface AuthContextProps {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isExpired: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  clearExpired: () => void;
  // Future-ready architectural contracts (extensible without breaking existing callers)
  sessionMeta?: AuthSessionMeta;
  loginWithOAuth?: (provider: AuthProviderType) => Promise<void>;
  verifyMfa?: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const clearStorage = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    delete client.defaults.headers.common["Authorization"];
  }, []);

  const restoreSession = useCallback(async () => {
    const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedToken) {
      try {
        // Always validate stored token against backend GET /api/v1/auth/me
        const data = await getMeApi();
        if (data && data.user) {
          client.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
          setUser(data.user);
          setToken(storedToken);
        } else {
          throw new Error("Invalid session payload");
        }
      } catch (error: unknown) {
        // Invalid or expired token – clear all storage
        clearStorage();
        setUser(null);
        setToken(null);
        const err = error as { response?: { status?: number } };
        if (err?.response?.status === 401) {
          setIsExpired(true);
        }
      }
    }
    setIsLoading(false);
  }, [clearStorage]);

  useEffect(() => {
    restoreSession();

    const handleLogoutEvent = () => {
      delete client.defaults.headers.common["Authorization"];
      setUser(null);
      setToken(null);
      setIsExpired(false);
    };

    const handleExpiredEvent = () => {
      delete client.defaults.headers.common["Authorization"];
      setUser(null);
      setToken(null);
      setIsExpired(true);
    };

    const handleStorageChange = (event: StorageEvent) => {
      // Multi-tab synchronization
      if ((event.key === "token" || event.key === "user") && !event.newValue) {
        delete client.defaults.headers.common["Authorization"];
        setUser(null);
        setToken(null);
        setIsExpired(false);
      } else if (event.key === "token" && event.newValue) {
        restoreSession();
      }
    };

    window.addEventListener("auth:logout", handleLogoutEvent);
    window.addEventListener("auth:expired", handleExpiredEvent);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("auth:logout", handleLogoutEvent);
      window.removeEventListener("auth:expired", handleExpiredEvent);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [restoreSession]);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean = true) => {
    const response = await loginApi(email, password);
    const { token: receivedToken, user: loggedUser } = response;

    // Dual-storage persistence: localStorage if Remember Me is checked, sessionStorage otherwise
    if (rememberMe) {
      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("token", receivedToken);
      sessionStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    client.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
    setToken(receivedToken);
    setUser(loggedUser);
    setIsExpired(false);
  }, []);

  const logout = useCallback(() => {
    clearStorage();
    setUser(null);
    setToken(null);
    setIsExpired(false);
    window.dispatchEvent(new Event("auth:logout"));
  }, [clearStorage]);

  const clearExpired = useCallback(() => {
    setIsExpired(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isExpired, login, logout, clearExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
