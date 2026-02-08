import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiCheck, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = location.state?.token;

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/change-password?resetToken=${resetToken}&newPassword=${form.password}`,
        { method: "POST" }
      );

      if (response.ok) {
        setIsReset(true);
        toast.success("Password changed successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4">
      <div className="bg-dark-elev/95 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-beige/10">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-beige/70 hover:text-beige mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold">QuickEats</h1>
          <h2 className="text-xl font-semibold text-beige mt-2">Reset Password</h2>
          <p className="text-beige/70 text-sm mt-2">
            Create a new strong password
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-beige text-sm flex items-center gap-2 mb-1">
              <FiLock className="text-amber-500" />
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige pr-12"
                placeholder="Enter new password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={isReset}
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

          <div>
            <label className="text-beige text-sm flex items-center gap-2 mb-1">
              <FiLock className="text-amber-500" />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige pr-12"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                disabled={isReset}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-beige/60"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isReset}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {isLoading ? "Resetting..." : isReset ? <>Password Changed <FiCheck /></> : "Change Password"}
          </button>
        </form>

        <p className="text-center text-beige/70 text-sm mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-gold font-semibold">
            Back to Login
          </Link>
        </p>

      </div>
    </section>
  );
}
