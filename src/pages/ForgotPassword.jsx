import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/forget-password?email=${email}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setIsSent(true);
        toast.success("OTP sent to your email!");

        
        localStorage.setItem("verify_email", email);

        
        navigate("/verify-reset-otp", { state: { email } });

      } else {
        toast.error("Email not found. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('/images/login.jpg')",
      }}
    >
      <div className="bg-dark-elev/95 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-beige/10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-beige/70 hover:text-beige mb-6"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold">QuickEats</h1>
          <h2 className="text-xl font-semibold text-beige mt-2">Forgot Password</h2>
          <p className="text-beige/70 text-sm mt-2">
            Enter your email to receive OTP code
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-beige text-sm flex items-center gap-2 mb-1">
              <FiMail className="text-amber-500" />
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSent}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || isSent}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {isLoading
              ? "Sending..."
              : isSent
              ? "OTP Sent ✓"
              : "Reset My Password"}
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
