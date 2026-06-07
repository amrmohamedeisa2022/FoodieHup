import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../api/api";

export default function TrackOrder() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("quickeats_token");
  const orderId = localStorage.getItem("lastOrderId");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await api.get("/api/order/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const found = res.data.find((o) => o.id == orderId);
        setOrder(found);
      } catch (e) {
        console.error(e);
      }
    }

    fetchOrder();

    // 🔥 تحديث تلقائي
    const interval = setInterval(fetchOrder, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!order)
    return (
      <div className="text-white text-center mt-20">
        Loading...
      </div>
    );

  const steps = [
    "PENDING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "COMPLETED",
  ];

  const currentStep = steps.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev px-4 py-10">

      {/* 🔥 زر الرجوع */}
      <button
        onClick={() => navigate("/my-orders")}
        className="flex items-center gap-2 text-beige mb-6 hover:text-amber-500 transition"
      >
        <FiArrowLeft />
        Back
      </button>

      <div className="flex items-center justify-center">

        <div className="bg-dark-elev border border-white/10 p-8 rounded-2xl w-full max-w-xl shadow-xl">

          <h1 className="text-2xl text-beige font-bold mb-8 text-center">
            Order Tracking 🚚
          </h1>

          {/* 🔥 Progress */}
          <div className="flex justify-between items-center relative">

            {steps.map((step, index) => (
              <div
                key={step}
                className="flex flex-col items-center flex-1 relative"
              >
                {/* 🔥 الخط */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-1 -z-10
                    ${
                      index < currentStep
                        ? "bg-amber-500"
                        : "bg-white/10"
                    }`}
                  />
                )}

                {/* 🔥 الدايرة */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${
                    index <= currentStep
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {index + 1}
                </div>

                {/* 🔥 النص */}
                <span className="text-xs mt-3 text-beige text-center">
                  {step.replaceAll("_", " ")}
                </span>
              </div>
            ))}
          </div>

          {/* 🔥 الحالة */}
          <div className="mt-10 text-center">
            <span className="text-beige/70">
              Current Status:
            </span>

            <div className="text-xl font-bold text-amber-500 mt-2">
              {order.orderStatus.replaceAll("_", " ")}
            </div>
          </div>

          {/* 🔥 لو اتكنسل */}
          {order.orderStatus === "CANCELLED" && (
            <div className="mt-6 text-red-500 text-center font-bold">
              ❌ Order Cancelled
            </div>
          )}
        </div>
      </div>
    </div>
  );
}