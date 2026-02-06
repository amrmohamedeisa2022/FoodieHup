import React from "react";
import { useParams } from "react-router-dom";
import meals from "../data/meals";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MealDetails(){
  const { id } = useParams();
  const meal = meals.find(m => m.id === Number(id)) || meals[0];
  const { addItem } = useCart();

  return (
    <>
      <Navbar />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <img src={meal.image} alt={meal.name} className="rounded-2xl object-cover w-full h-96" />
          <div>
            <h1 className="text-3xl font-bold text-gold mb-2">{meal.name}</h1>
            <div className="text-beige/80 mb-4">{meal.desc}</div>
            <div className="mb-4"> <strong>Time:</strong> {meal.time} • <strong>Rating:</strong> {meal.rating}</div>
            <div className="flex gap-3">
              <button onClick={()=> addItem(meal)} className="btn-cta">Add to Cart - {meal.price} EGP</button>
              <button className="btn-secondary">Favorite</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
