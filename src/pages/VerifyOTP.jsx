import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);
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

    try {
      const res = await api.post(
        `/api/users/verify-otp?email=${email}&otp=${otp}`
      );

      setMessage("OTP verified successfully");

      // إرسال resetToken إلى صفحة تغيير كلمة المرور
      navigate("/reset-password", { state: { token: res.data } });
    } catch (err) {
      setMessage(
        err?.response?.data?.message || "OTP verification failed"
      );
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h1>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 rounded-lg text-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg"
          >
            Verify
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-red-400">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
