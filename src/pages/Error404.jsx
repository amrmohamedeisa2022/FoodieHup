import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-dark-primary text-center px-6">
      <h1 className="text-7xl font-extrabold text-gold mb-4">404</h1>
      <p className="text-beige/80 text-lg mb-6">Oops! Page not found.</p>
      <Link to="/" className="btn-cta">
        Back to Home 🏠
      </Link>
    </section>
  );
}
