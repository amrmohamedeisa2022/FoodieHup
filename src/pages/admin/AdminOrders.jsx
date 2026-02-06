import React from "react";

export default function AdminOrders() {
  const orders = [
    { id: 1, customer: "Mohamed", total: 320, status: "Delivered", date: "2025-10-21" },
    { id: 2, customer: "Sara", total: 180, status: "Pending", date: "2025-10-23" },
    { id: 3, customer: "Ali", total: 245, status: "Preparing", date: "2025-10-24" },
  ];

  return (
    <section className="p-6 text-beige">
      <h2 className="text-2xl font-bold text-gold mb-6">📦 Orders Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-dark-elev/40 rounded-xl overflow-hidden">
          <thead className="bg-dark-elev text-gold">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total (EGP)</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-t border-dark-elev/30 hover:bg-dark-elev/40 transition"
              >
                <td className="px-4 py-2">{o.id}</td>
                <td className="px-4 py-2">{o.customer}</td>
                <td className="px-4 py-2">{o.date}</td>
                <td className="px-4 py-2 text-gold font-semibold">{o.total}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    o.status === "Delivered"
                      ? "text-green-400"
                      : o.status === "Pending"
                      ? "text-yellow-400"
                      : "text-orange-400"
                  }`}
                >
                  {o.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
