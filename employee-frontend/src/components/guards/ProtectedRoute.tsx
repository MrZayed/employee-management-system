import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

export default function ProtectedRoute({
    roles,
}: {
    roles?: string[];
}) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (roles && user && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}