import React from "react";

export default function Categories() {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="cat-card">🍔 Burgers</div>
          <div className="cat-card">🍕 Pizza</div>
          <div className="cat-card">🥗 Healthy</div>
          <div className="cat-card">🍰 Desserts</div>
        </div>
      </div>
    </section>
  );
}
