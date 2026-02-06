import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("quickeats_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("quickeats_favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(meal) {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === meal.id);
      if (exists) return prev.filter((f) => f.id !== meal.id);
      return [...prev, meal];
    });
  }

  function isFavorite(id) {
    return favorites.some((f) => f.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
