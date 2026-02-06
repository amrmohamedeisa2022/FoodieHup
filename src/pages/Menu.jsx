import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { FiSearch, FiClock, FiStar, FiPlus, FiHeart } from "react-icons/fi";
import Navbar from "../components/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { getMenuItemsByRestaurantId } from "../state/menu/menu.action";

import mealsData from "../data/meals";

export default function Menu({ hideNavbar = false }) {
  const dispatch = useDispatch();
  const { menu, restaurant } = useSelector((store) => store);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // ✅ أول ما الصفحة تفتح: هات أكلات الأدمن من redux
  useEffect(() => {
    const restaurantId = restaurant?.usersRestaurant?.id || 1;
    dispatch(getMenuItemsByRestaurantId({ restaurantId }));
  }, [dispatch, restaurant?.usersRestaurant?.id]);

  // ✅ تحويل أكلات الأدمن لشكل mealsData
  const adminMeals = useMemo(() => {
    return (menu?.menuItems || []).map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category?.name || "Admin Meals",
      price: item.price,
      rating: 5,
      time: "10-15 min",
      image: item.images?.[0],
      description: item.description || "",
      ingredients: item.ingredients || [],
    }));
  }, [menu?.menuItems]);

  // ✅ دمج أكلات الأدمن + أكلات الموقع الأساسية
  const updatedMealsData = useMemo(() => {
    return [...adminMeals, ...(mealsData || [])];
  }, [adminMeals]);

  // ✅ normalize categories
  const normalizeCategory = (cat) => {
    if (!cat) return "Other";
    const c = cat.toLowerCase();
    if (c.includes("burger")) return "Burgers";
    if (c.includes("dessert")) return "Desserts";
    return cat;
  };

  const normalizedMealsData = useMemo(() => {
    return updatedMealsData.map((meal) => ({
      ...meal,
      normalizedCategory: normalizeCategory(meal.category),
    }));
  }, [updatedMealsData]);

  const categories = useMemo(() => {
    return ["All", ...new Set(normalizedMealsData.map((m) => m.normalizedCategory))];
  }, [normalizedMealsData]);

  // ✅ filtering
  const filteredMeals = useMemo(() => {
    let filtered = normalizedMealsData;

    if (category !== "All") {
      filtered = filtered.filter((m) => m.normalizedCategory === category);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [normalizedMealsData, category, search]);

  const displayedMeals = useMemo(() => {
    return filteredMeals.slice(0, visibleCount);
  }, [filteredMeals, visibleCount]);

  useEffect(() => {
    // ✅ لما نغير فلتر او بحث يبدأ من الأول
    setVisibleCount(8);
  }, [category, search]);

  const handleAddToCart = (meal) => addItem(meal);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);
  const canLoadMore = visibleCount < filteredMeals.length;

  return (
    <>
      {!hideNavbar && <Navbar />}

      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gold mb-4">Our Popular Dishes</h1>
            <p className="text-beige/70 text-lg max-w-2xl mx-auto">
              Discover delicious meals prepared by our top chefs, delivered hot and fresh to your doorstep
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-12">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-beige/60 text-xl" />
              <input
                type="text"
                placeholder="Search for a meal..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-beige/20 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-dark-primary text-beige placeholder-beige/60"
              />
            </div>

            <div className="lg:w-64">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border border-beige/20 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-dark-primary text-beige cursor-pointer"
              >
                {categories.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-beige/60">
              Showing {displayedMeals.length} of {filteredMeals.length}{" "}
              {filteredMeals.length === 1 ? "meal" : "meals"}
              {category !== "All" && ` in ${category}`}
              {search && ` for "${search}"`}
            </p>
          </div>

          {/* Meals Grid */}
          {displayedMeals.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-beige mb-3">No meals found</h3>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-dark-elev rounded-2xl overflow-hidden border border-beige/10 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/300/200";
                      }}
                    />

                    <button
                      onClick={() => toggleFavorite(meal)}
                      className={`absolute top-3 right-3 w-10 h-10 bg-dark-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 ${
                        isFavorite(meal.id)
                          ? "text-amber-500 bg-amber-500/20"
                          : "text-beige/60 hover:text-amber-500 hover:bg-amber-500/20"
                      }`}
                    >
                      <FiHeart
                        className={`text-lg ${isFavorite(meal.id) ? "fill-current" : ""}`}
                      />
                    </button>

                    <div className="absolute top-3 left-3 bg-dark-primary/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-beige/90 text-sm">
                      <FiClock className="text-amber-500 text-xs" />
                      {meal.time}
                    </div>

                    {meal.normalizedCategory && (
                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full px-3 py-1 text-xs font-medium">
                        {meal.normalizedCategory}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-beige mb-2">{meal.name}</h3>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        <FiStar className="fill-current" />
                        <span className="text-beige font-medium">{meal.rating || 4.5}</span>
                      </div>

                      {meal.price && (
                        <span className="text-gold font-bold text-lg">${meal.price}</span>
                      )}
                    </div>

                    {meal.description && (
                      <p className="text-beige/60 text-sm mb-4 leading-relaxed">
                        {meal.description}
                      </p>
                    )}

                    <button
                      onClick={() => handleAddToCart(meal)}
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

          {/* Load More */}
          {canLoadMore && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Load More Meals ({filteredMeals.length - displayedMeals.length} remaining)
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
