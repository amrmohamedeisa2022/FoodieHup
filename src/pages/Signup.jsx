import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
  });

  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErr(null);

    const res = await signup(form);

    if (!res.success) {
      setErr(res.message);
      setIsLoading(false);
      return;
    }

    // تخزين الدور مؤقتًا
    localStorage.setItem("quickeats_pending_role", form.role);

    // تخزين الإيميل لصفحة OTP
    localStorage.setItem("verify_email", form.email);

    // ✅ الانتقال لصفحة OTP الخاصة بتفعيل الحساب
    navigate("/verify-signup-otp", { state: { email: form.email } });

    setIsLoading(false);
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('/images/signup.jpg')",
      }}
    >
      <div className="bg-dark-elev/95 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-beige/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold mb-2">Create Account</h1>
          <p className="text-beige/70 text-sm">Join QuickEats today</p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="text-beige text-sm flex items-center gap-2 mb-1">
              <FiUser className="text-amber-500" />
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige"
              placeholder="Your name"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="text-beige text-sm flex items-center gap-2 mb-1">
              <FiMail className="text-amber-500" />
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="text-beige text-sm flex items-center gap-2 mb-1">
              <FiLock className="text-amber-500" />
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige"
              placeholder="Create password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="text-beige text-sm mb-2 block">
              Account Type
            </label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige"
            >
              <option value="ROLE_CUSTOMER">Customer (User)</option>
              <option value="ROLE_RESTAURANT_OWNER">
                Restaurant Owner
              </option>
            </select>
          </div>

          {err && (
            <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 p-3 rounded-xl">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {isLoading ? (
              "Creating account..."
            ) : (
              <>
                Create Account <FiArrowRight />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-beige/70 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-gold font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
