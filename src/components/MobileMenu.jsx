import React from "react";
import { FiX } from "react-icons/fi";

export default function MobileMenu({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 w-3/4 h-full bg-dark-elev p-6">
        <button onClick={onClose} className="mb-6"><FiX className="text-2xl text-beige" /></button>
        <nav className="flex flex-col gap-4 text-beige">
          <a href="#home" onClick={onClose}>Home</a>
          <a href="#menu" onClick={onClose}>Menu</a>
          <a href="#about" onClick={onClose}>About</a>
          <a href="#contact" onClick={onClose}>Contact</a>
        </nav>
      </div>
    </div>
  );
}
