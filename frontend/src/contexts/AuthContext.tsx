import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginApi, getMeApi } from "../api/auth";

interface User {
  id: string;
  email: string;
  role: "junior" | "senior" | "admin";
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const restoreSession = async () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const data = await getMeApi(); // expects token in interceptor
        setUser(data.user);
        setToken(storedToken);
      } catch (err) {
        // Invalid token – clear
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        // Redirect handled by router elsewhere
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginApi(email, password);
    const { token: receivedToken, user: loggedUser } = response.data;
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    setToken(receivedToken);
    setUser(loggedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    // programmatic navigation can be done by caller
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
