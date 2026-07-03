import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthInitializer } from "./components/common/AuthInitializer";

/**
 * App – Root application component.
 *
 * Wraps the entire app with:
 *  1. BrowserRouter  – client-side routing
 *  2. AuthProvider   – authentication context (user, token, login, logout)
 *  3. AuthInitializer – session restoration logic
 *  4. AppRoutes      – centralized route definitions
 *
 * Note: QueryClientProvider is configured in main.tsx (Sprint 0 pattern preserved).
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthInitializer>
          <AppRoutes />
        </AuthInitializer>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
