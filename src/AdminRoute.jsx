import React from "react";
import { Navigate } from "react-router-dom";
import { Admin } from "./AdminComponent/Admin/Admin";
import { useAuth } from "./context/AuthContext"; // ✅ عدل المسار لو مختلف

export default function AdminRoute() {
  const { user } = useAuth();

  // ✅ لازم يكون Owner
  if (!user || user.role !== "ROLE_RESTAURANT_OWNER") {
    return <Navigate to="/login" replace />;
  }

  return <Admin />;
}
