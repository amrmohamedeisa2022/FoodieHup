import { Route, Routes, Navigate } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import { useAuth } from "./context/AuthContext";

export default function Routers() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Admin */}
      <Route path="/admin/*" element={<AdminRoute />} />

      {/* Customer (كل الموقع) */}
      <Route path="/*" element={<CustomerRoute />} />

      {/* Redirect owner لو دخل / */}
      {user?.role === "ROLE_RESTAURANT_OWNER" && (
        <Route path="/" element={<Navigate to="/admin" replace />} />
      )}
    </Routes>
  );
}
