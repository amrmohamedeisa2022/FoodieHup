import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { FiHeart, FiClock, FiStar, FiPlus, FiShoppingCart } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addItem } = useCart();

  const handleAddToCart = (meal) => {
    addItem(meal);
    
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-dark-primary to-dark-elev py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gold mb-4 flex items-center justify-center gap-3">
              <FiHeart className="text-amber-500" />
              My Favorites
            </h1>
            <p className="text-beige/70 text-lg">
              {favorites.length === 0 
                ? "Your favorite meals will appear here" 
                : `You have ${favorites.length} favorite ${favorites.length === 1 ? 'meal' : 'meals'}`}
            </p>
          </div>

          
          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiHeart className="text-4xl text-amber-500/60" />
              </div>
              <h3 className="text-2xl font-semibold text-beige mb-3">No favorites yet</h3>
              <p className="text-beige/60 mb-8 max-w-md mx-auto">
                Start exploring our menu and add your favorite meals to this list!
              </p>
              <button 
                onClick={() => window.location.href = '/menu'}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((meal) => (
                <div
                  key={meal.id}
                  className="group bg-dark-elev rounded-2xl overflow-hidden border border-beige/10 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl"
                >
                  
                  <div className="relative overflow-hidden">
                    <img
                      src={meal.image || "/api/placeholder/300/200"}
                      alt={meal.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    
                    <button
                      onClick={() => toggleFavorite(meal)}
                      className="absolute top-3 right-3 w-10 h-10 bg-dark-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300"
                    >
                      <FiHeart className="text-lg fill-current" />
                    </button>

                    
                    <div className="absolute top-3 left-3 bg-dark-primary/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-beige/90 text-sm">
                      <FiClock className="text-amber-500" />
                      {meal.time}
                    </div>
                  </div>

                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-beige mb-2 line-clamp-1">
                      {meal.name}
                    </h3>

                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        <FiStar className="fill-current" />
                        <span className="text-beige font-medium">{meal.rating}</span>
                      </div>
                      {meal.price && (
                        <span className="text-gold font-bold text-lg">
                          ${meal.price}
                        </span>
                      )}
                    </div>

                    
                    <button
                      onClick={() => handleAddToCart(meal)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <FiPlus className="text-lg" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          
          {favorites.length > 0 && (
            <div className="mt-12 text-center">
              <div className="inline-flex flex-col sm:flex-row gap-4 bg-dark-elev/50 rounded-2xl p-6 border border-beige/10">
                <p className="text-beige/70 flex items-center gap-2">
                  <FiShoppingCart className="text-amber-500" />
                  Ready to order your favorites?
                </p>
                <button 
                  onClick={() => window.location.href = '/cart'}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all shrink-0"
                >
                  View Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}