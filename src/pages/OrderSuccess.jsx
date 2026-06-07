import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../api/api";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("quickeats_token");
      const orderId = localStorage.getItem("lastOrderId");

      if (!orderId) {
        toast.error("Order ID not found ❌");
        return;
      }

      console.log("ORDER ID:", orderId);

      await api.delete(`/api/order/${orderId}/cancel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order cancelled successfully ❌");

      localStorage.removeItem("lastOrderId");

      setShowModal(false);
      navigate("/");
    } catch (e) {
      console.error(e);
      toast.error("Failed to cancel order ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-primary to-dark-elev px-4">

      <div className="bg-dark-elev border border-beige/10 rounded-2xl p-10 text-center max-w-md w-full">

        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-beige mb-3">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-beige/70 mb-6">
          Your order has been received and is being prepared.
        </p>

        {/* 🔥 Track Order Box */}
        <div
          onClick={() => navigate("/track-order")}
          className="mb-4 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-xl flex items-center justify-between hover:opacity-90 transition"
        >
          <div>
            <h3 className="text-white font-bold text-lg">
              Track your order 🚚
            </h3>
            <p className="text-white/70 text-sm">
              See live updates for your order
            </p>
          </div>

          <span className="text-white text-2xl">→</span>
        </div>

        <div className="flex flex-col gap-3">

          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
          >
            Back to Home
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="border border-red-500 text-red-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition"
          >
            <FiXCircle />
            Cancel Order
          </button>

        </div>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#111] rounded-2xl p-6 w-[350px] text-center animate-scaleIn">

            <h2 className="text-xl font-bold text-white mb-3">
              Cancel Order ❌
            </h2>

            <p className="text-gray-400 mb-6">
              Are you sure you want to cancel this order?
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-600 text-gray-300 py-2 rounded-lg"
              >
                No
              </button>

              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                {loading ? "Cancelling..." : "Yes, Cancel"}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}