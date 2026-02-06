import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("quickeats_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("quickeats_user", JSON.stringify(user));
    else localStorage.removeItem("quickeats_user");
  }, [user]);

  // =========================
  // ✅ SIGNUP (FIXED)
  // =========================
 async function signup({ fullName, email, password, role }) {
  try {
    const res = await api.post("/api/auth/signup", {
      fullName,
      email,
      password,
      role, // ROLE_CUSTOMER | ROLE_RESTAURANT_OWNER
    });

    const token = res.data?.jwt;
    if (!token) {
      return {
        success: false,
        message: "No token returned from server",
      };
    }

    // ✅ خزّن التوكن
    localStorage.setItem("quickeats_token", token);

    // ✅ خزّن اليوزر صح
    setUser({
      fullName: res.data.fullName ?? fullName,
      email: res.data.email ?? email,
      role: res.data.role,
    });

    return {
      success: true,
      message: res.data?.message || "Register success",
    };
  } catch (e) {
    return {
      success: false,
      message:
        e?.response?.data?.message ||
        e?.message ||
        "Signup failed, please try again",
    };
  }
}



  // =========================
  // ✅ LOGIN (FIXED)
  // =========================
  async function login({ email, password }) {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data?.jwt;
      const apiRole = res.data?.role;

      if (!token) {
        return { success: false, message: "No token returned from server" };
      }

      localStorage.setItem("quickeats_token", token);

      setUser({
        email,
        role: apiRole,
      });

      return {
        success: true,
        message: res.data?.message || "Login success",
      };
    } catch (e) {
      return {
        success: false,
        message:
          e?.response?.data?.message ||
          e?.message ||
          "Login failed, please try again",
      };
    }
  }

  function logout() {
    setUser(null);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
