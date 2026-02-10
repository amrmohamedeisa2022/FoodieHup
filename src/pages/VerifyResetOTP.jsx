import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function VerifyResetOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
  location.state?.email || localStorage.getItem("verify_email");


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

  /* verify otp */
  const handleVerify = async (e) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter full OTP");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/users/verify-otp?email=${email}&otp=${code}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error();

      const token = await res.text();

      toast.success("OTP Verified");

      navigate("/reset-password", { state: { token } });
    } catch {
      toast.error("Invalid OTP");
    }
  };

const handleResend = async () => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/users/resend-reset-otp?email=${email}`,
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
      <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl p-10 w-full max-w-md shadow-2xl text-center">

        <h1 className="text-3xl font-bold text-white mb-2">
          Verify Reset Code
        </h1>

        <p className="text-white/60 mb-8">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleVerify}>
          <div className="flex justify-center gap-4 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-14 h-16 text-center text-2xl font-bold 
                bg-[#111] text-white border border-white/20 rounded-xl
                focus:outline-none focus:border-amber-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500
            text-white py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-white/60 text-sm mt-6">
          Didn’t receive code?{" "}
          <button
            onClick={handleResend}
            className="text-amber-400 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        </p>

      </div>
    </div>
  );
}
