import { Navigate, useLocation } from "react-router-dom";
import { useAccountStore } from "@/store/useAccountStore";
import { JSX } from "react";
import { decodeJWTManual } from "@/lib/utils";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles, redirectTo = "/" }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = decodeJWTManual(accessToken);
  const userRole = decodedToken?.role.toLowerCase() || null;
  console.log("userRole", userRole);
  console.log("allowedRoles", allowedRoles);
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
