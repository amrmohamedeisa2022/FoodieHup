import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/foods", label: "Foods" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/categories", label: "Categories" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-dark-elev text-beige flex flex-col border-r border-dark-elev/40">
      <div className="p-5 text-center font-extrabold text-gold text-xl border-b border-dark-elev/50">
        QuickEats Admin
      </div>
      <nav className="flex-1 flex flex-col p-4 space-y-2">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition ${
                isActive ? "bg-cta text-white" : "hover:bg-dark-primary"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-dark-elev/40 text-sm text-center text-beige/60">
        © {new Date().getFullYear()} QuickEats
      </div>
    </aside>
  );
}
