import React from "react";

export default function MenuCard({ meal, onAdd }) {
  return (
    <article className="food-card reveal-init">
      <img src={meal.image} alt={meal.name} className="card-img" />
      <div className="p-4 bg-dark-elev">
        <h3 className="font-bold text-lg text-beige">{meal.name}</h3>
        <p className="text-sm text-beige/70 mt-1">{meal.desc}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-beige/90">{meal.time}</div>
          <div className="flex items-center gap-3">
            <div className="rating text-gold">★ {meal.rating}</div>
            <button onClick={() => onAdd(meal)} className="btn-sm">Add</button>
          </div>
        </div>
      </div>
    </article>
  );
}
