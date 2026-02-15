import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter full OTP");
      return;
    }

    const email = localStorage.getItem("verify_email");

    try {
      const res = await fetch(
        `http://localhost:8080/api/users/activate?email=${email}&otp=${code}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error();

      toast.success("Account activated successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch {
      toast.error("Invalid OTP");
    }
  };

  
  const handleResend = async () => {
    const email = localStorage.getItem("verify_email");

    try {
      const res = await fetch(
        `http://localhost:8080/api/users/resend-otp?email=${email}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error();

      toast.success("OTP resent successfully");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold text-gold text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-beige/70 text-sm text-center mb-8">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleVerify}>
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-14 text-center text-xl font-bold bg-[#0f0f0f] text-white border border-white/20 rounded-xl focus:outline-none focus:border-amber-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-center text-beige/60 text-sm mt-6">
          Didn’t receive code?{" "}
          <button
            onClick={handleResend}
            className="text-gold font-semibold hover:underline"
          >
            ResendOTP
          </button>
        </p>
      </div>
    </div>
  );
}
