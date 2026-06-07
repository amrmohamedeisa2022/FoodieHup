import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../api/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("quickeats_token");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api.get("/api/order/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchOrders();
  }, []);

  // 🎨 status color
  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "OUT_FOR_DELIVERY":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "DELIVERED":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "CANCELLED":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev px-6 py-10">

      {/* 🔥 Header + Back */}
      <div className="flex items-center gap-4 mb-8">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-beige hover:text-amber-500 transition"
        >
          <FiArrowLeft />
          Back
        </button>

        <h1 className="text-3xl font-bold text-beige flex items-center gap-2">
          My Orders 
        </h1>

      </div>

      <div className="space-y-5">

        {orders.map((order) => (
          <div
            key={order.id}
            className="group bg-dark-elev border border-white/10 p-5 rounded-2xl flex justify-between items-center 
            hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] transition-all duration-300"
          >

            {/* 🔥 LEFT */}
            <div className="space-y-2">

              <p className="text-lg font-bold text-beige">
                Order #{order.id}
              </p>

              <p className="text-beige/70 text-sm">
                {(order.totalAmount ?? order.totalPrice)} EGP
              </p>

              {/* 🔥 STATUS BADGE */}
              <span
                className={`text-xs px-3 py-1 rounded-full border font-medium inline-block ${getStatusStyle(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus.replaceAll("_", " ")}
              </span>
            </div>

            {/* 🔥 RIGHT */}
            <div className="flex flex-col items-end gap-2">

              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />

              <button
                onClick={() => {
                  localStorage.setItem("lastOrderId", order.id);
                  navigate("/track-order");
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-black px-5 py-2 rounded-xl font-bold 
                hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                Track 🚚
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center text-beige/60 mt-20">
            No orders yet 😢
          </div>
        )}

      </div>
    </div>
  );
}