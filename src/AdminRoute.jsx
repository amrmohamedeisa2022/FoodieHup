import React from "react";
import { Navigate } from "react-router-dom";
import { Admin } from "./AdminComponent/Admin/Admin";
import { useAuth } from "./context/AuthContext"; 

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "ROLE_RESTAURANT_OWNER") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
