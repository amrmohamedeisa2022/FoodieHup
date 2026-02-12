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

  async function signup({ fullName, email, password, role }) {
    try {
      const res = await api.post("/api/auth/signup", {
        fullName,
        email,
        password,
        role,
      });

      return {
        success: true,
        message:
          res.data?.message ||
          "Account created. Please verify OTP sent to your email",
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

async function login({ email, password }) {
  try {
    const res = await api.post("/api/auth/login", { email, password });

    const token = res.data?.jwt;

    if (!token) {
      return { success: false, message: "Login failed" };
    }

    localStorage.setItem("quickeats_token", token);

    const userData = {
      name: res.data?.fullName,
      email,
      role: res.data?.role,
    };

    setUser(userData);

    return {
      success: true,
      role: res.data?.role,
      hasRestaurant: res.data?.hasRestaurant,
    };

  } catch (e) {
    return {
      success: false,
      message:
        e?.response?.data?.message ||
        e?.message ||
        "Login failed",
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
