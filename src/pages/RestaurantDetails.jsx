import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import restaurants from "../data/restaurants";
import restaurantMeals from "../data/restaurantMeals";
import { useCart } from "../context/CartContext";
import { FiSearch, FiClock, FiMapPin, FiStar, FiPlus, FiArrowLeft, FiFilter } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function RestaurantDetails() {
  const { id } = useParams();
  const restaurantId = Number(id);
  const navigate = useNavigate();

  const restaurant = restaurants.find((r) => r.id === restaurantId);
  const meals = restaurantMeals[restaurantId] || [];

  const { addItem } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(meals.map((m) => m.category))];
  }, [meals]);

  const filteredMeals = useMemo(() => {
    let res = meals;

    if (category !== "All") {
      res = res.filter((m) => m.category === category);
    }

    if (search.trim()) {
      res = res.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return res;
  }, [meals, category, search]);

  if (!restaurant) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-amber-500/60">😕</span>
            </div>
            <h2 className="text-3xl font-bold text-beige mb-2">
              Restaurant not found
            </h2>
            <p className="text-beige/60 mb-8 max-w-md mx-auto">
              The restaurant you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/restaurants" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all inline-block"
            >
              Back to Restaurants
            </Link>
          </div>
        </section>
      </>
    );
  }

  // ✅ Closed Restaurant UI
  if (!restaurant.open) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark-elev rounded-2xl p-8 border border-beige/10 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-red-400">🚫</span>
              </div>
              
              <h1 className="text-4xl font-bold text-beige mb-3">
                {restaurant.name}
              </h1>
              
              <div className="flex items-center justify-center gap-2 mb-6 text-beige/70">
                <FiMapPin className="text-amber-500" />
                <span>{restaurant.address}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 mb-8">
                This restaurant is currently closed
              </div>

              <div className="space-y-4">
                <p className="text-beige/60">
                  Check back later or explore other amazing restaurants!
                </p>
                <Link 
                  to="/restaurants" 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all inline-block"
                >
                  Explore Restaurants
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Restaurant Header */}
          <div className="mb-12">
            <button 
              onClick={() => navigate("/restaurants")}
              className="flex items-center gap-2 text-beige/70 hover:text-gold transition-colors mb-6"
            >
              <FiArrowLeft className="text-lg" />
              Back to Restaurants
            </button>

            <div className="bg-dark-elev rounded-2xl p-6 border border-beige/10">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full md:w-48 h-48 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h1 className="text-3xl font-bold text-beige">{restaurant.name}</h1>
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                      <FiStar className="fill-current" />
                      <span className="font-bold">{restaurant.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-beige/70">
                    <FiMapPin className="text-amber-500" />
                    <span>{restaurant.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full w-fit">
                    <FiClock className="text-sm" />
                    <span className="font-medium">Open Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-12">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-beige/60 text-xl" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search meals in this restaurant..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-beige/20 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-dark-primary text-beige placeholder-beige/60"
              />
            </div>

            <div className="lg:w-64 relative">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-beige/60 text-xl" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-beige/20 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-dark-primary text-beige cursor-pointer appearance-none"
              >
                {categories.map((c, i) => (
                  <option key={i} value={c} className="bg-dark-primary text-beige">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8">
            <p className="text-beige/60">
              {filteredMeals.length === 0 
                ? "No meals found" 
                : `Showing ${filteredMeals.length} ${filteredMeals.length === 1 ? 'meal' : 'meals'}`
              }
              {category !== 'All' && ` in ${category}`}
              {search && ` for "${search}"`}
            </p>
          </div>

          {/* Meals Grid */}
          {filteredMeals.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiSearch className="text-4xl text-amber-500/60" />
              </div>
              <h3 className="text-2xl font-semibold text-beige mb-3">No meals found</h3>
              <p className="text-beige/60 mb-8 max-w-md mx-auto">
                {search || category !== 'All' 
                  ? "Try adjusting your search or filter"
                  : "This restaurant is updating their menu. Check back soon!"}
              </p>
              {(search || category !== 'All') && (
                <button 
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-dark-elev rounded-2xl overflow-hidden border border-beige/10 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg"
                >
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-beige mb-2 line-clamp-1">
                      {meal.name}
                    </h3>
                    
                    <p className="text-beige/60 text-sm mb-3 line-clamp-2">
                      {meal.desc}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-gold font-bold text-lg">
                        {meal.price} EGP
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <FiStar className="fill-current text-sm" />
                        <span className="text-beige font-medium text-sm">{meal.rating}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => addItem(meal)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      <FiPlus className="text-lg" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}