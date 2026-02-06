import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-dark-primary pt-32 pb-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        
        <div className="animate-fadeInUp space-y-8">
          <h1 className="text-6xl md:text-7xl font-extrabold text-beige leading-tight">
            Fresh & Fast <br /> Meals, <br /> Delivered to You
          </h1>
          <p className="text-beige/80 text-xl max-w-lg leading-relaxed">
            QuickEats delivers hot, chef-prepared food from the best local restaurants —
            fast, reliable, and delicious.
          </p>

         
          <div className="flex items-center gap-6 pt-2">
            <Link
              to="/menu"
              className="btn-cta flex items-center gap-2 text-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Order Now <span>→</span>
            </Link>
            <Link
              to="/menu"
              className="btn-ghost text-lg hover:translate-y-[-2px] transition-all duration-300"
            >
              Explore Menu
            </Link>
          </div>

         
          <div className="flex flex-wrap gap-3 pt-5">
            <span className="badge text-sm px-4 py-2">🚚 Free delivery</span>
            <span className="badge text-sm px-4 py-2">🔒 Secure payments</span>
            <span className="badge text-sm px-4 py-2">📡 Real-time tracking</span>
          </div>
        </div>

       
        <div className="relative hero-img animate-fadeInRight rounded-3xl shadow-2xl overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Food delivery"
            className="w-full h-[450px] object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-1.5 text-sm rounded-lg shadow-md">
            TODAY’S DEAL — 20% OFF Burgers 🍔
          </div>
        </div>
      </div>
    </section>
  );
}