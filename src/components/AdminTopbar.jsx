import React from "react";

export default function AdminTopbar() {
  return (
    <header className="bg-dark-elev/70 backdrop-blur-md border-b border-dark-elev/40 px-6 py-3 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gold">Admin Dashboard</h2>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="form-input w-56"
        />
        <div className="flex items-center gap-2">
          <img
            src="/images/chef.jpg"
            alt="admin"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-beige/80">Admin</span>
        </div>
      </div>
    </header>
  );
}
