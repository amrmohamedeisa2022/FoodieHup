import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiKey } from "react-icons/fi";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  async function handleVerify(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await api.post(
        `/api/users/verify-otp?email=${email}&otp=${otp}`
      );

      setMessage("OTP verified successfully ✅");

      navigate("/reset-password", {
        state: { token: res.data },
      });
    } catch (err) {
      setMessage(
        err?.response?.data?.message || "OTP verification failed ❌"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('/images/login.jpg')",
      }}
    >
      <div className="relative bg-dark-elev/95 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-beige/10">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-1 text-beige/70 hover:text-gold transition"
        >
          <FiArrowLeft />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
              <FiKey className="text-amber-500 text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gold mb-2">
            Verify OTP
          </h1>
          <p className="text-beige/70 text-sm">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full px-4 py-3 bg-dark-primary border border-beige/20 rounded-xl text-beige text-center tracking-[0.3em] text-lg focus:outline-none focus:border-amber-500"
            required
          />

          {message && (
            <div className="text-center text-sm text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-xl">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold transition hover:shadow-lg disabled:opacity-60"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </section>
  );
}
