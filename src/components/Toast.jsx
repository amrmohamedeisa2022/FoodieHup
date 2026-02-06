import React from "react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-10 z-50 bg-black/80 text-white px-4 py-2 rounded shadow-lg">
      {toast}
    </div>
  );
}
