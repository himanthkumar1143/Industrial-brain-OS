import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthInitializer } from "./components/common/AuthInitializer";
import { ScrollToTop } from "./components/common/ScrollToTop";

/**
 * App – Root application component.
 *
 * Wraps the entire app with:
 *  1. BrowserRouter   – client-side routing
 *  2. ScrollToTop     – global scroll restoration on navigation
 *  3. ToastProvider   – centralized notification system
 *  4. AuthProvider    – authentication context (user, token, login, logout)
 *  5. AuthInitializer – session restoration logic
 *  6. AppRoutes       – centralized route definitions
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <AuthProvider>
          <AuthInitializer>
            <AppRoutes />
          </AuthInitializer>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
