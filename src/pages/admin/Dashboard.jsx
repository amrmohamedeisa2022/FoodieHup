import React from "react";

export default function Dashboard() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-gold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-dark-elev p-6 rounded-lg shadow">
          <h3 className="text-beige/70">Total Orders</h3>
          <p className="text-2xl font-bold text-gold mt-2">156</p>
        </div>
        <div className="bg-dark-elev p-6 rounded-lg shadow">
          <h3 className="text-beige/70">Total Revenue</h3>
          <p className="text-2xl font-bold text-gold mt-2">$4,250</p>
        </div>
        <div className="bg-dark-elev p-6 rounded-lg shadow">
          <h3 className="text-beige/70">Active Users</h3>
          <p className="text-2xl font-bold text-gold mt-2">28</p>
        </div>
      </div>
    </section>
  );
}
