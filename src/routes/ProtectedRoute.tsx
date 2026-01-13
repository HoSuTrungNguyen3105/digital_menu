import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: any) {
  const { isAuthenticated, loading } = useAuth();

  // ⏳ While checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  // ❌ Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  // ✅ Authenticated
  return children;
}
