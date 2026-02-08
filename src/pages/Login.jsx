import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErr(null);

    const res = await login(form);

    if (!res.success) {
      setErr(res.message);
      setIsLoading(false);
      return;
    }

    const raw = localStorage.getItem("quickeats_user");
    const currentUser = raw ? JSON.parse(raw) : null;

    if (currentUser?.role === "ROLE_RESTAURANT_OWNER") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

    setIsLoading(false);
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('/images/login.jpg')",
      }}
    >
      <div className="bg-dark-elev/95 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-beige/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold">QuickEats</h1>
          <h2 className="text-xl font-semibold text-beige mt-2">Welcome Back</h2>
          <p className="text-beige/70 text-sm">Login to continue</p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="text-beige text-sm flex items-center gap-2 mb-1">
              <FiMail className="text-amber-500" />
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-beige text-sm flex items-center gap-2 mb-1">
              <FiLock className="text-amber-500" />
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige pr-12"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-beige/60"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* إضافة رابط Forgot Password هنا */}
          <div className="flex justify-end">
          <button
  type="button"
  onClick={() => {
    if (!form.email) {
      setErr("Please enter your email first");
      return;
    }
    navigate("/forgot-password", { state: { email: form.email } });
  }}
  className="text-amber-500 text-sm hover:text-amber-400 transition-colors"
>
  Forgot your password?
</button>

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
              "Signing in..."
            ) : (
              <>
                Sign In <FiArrowRight />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-beige/70 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gold font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}

//its work