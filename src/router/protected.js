import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import React from "react";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const [cookies] = useCookies(["demo"]);

  if (!cookies?.token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export { ProtectedRoute };
