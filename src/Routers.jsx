import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import { useAuth } from "./context/AuthContext"; 

export default function Routers() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          user?.role === "ROLE_RESTAURANT_OWNER" ? (
            <Navigate to="/admin" replace />
          ) : (
            <CustomerRoute />
          )
        }
      />

      
      <Route path="/admin/*" element={<AdminRoute />} />

      
      <Route path="/*" element={<CustomerRoute />} />
    </Routes>
  );
}
