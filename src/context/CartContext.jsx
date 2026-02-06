import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const v = localStorage.getItem("quickeats_cart");
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  });

  
  const [favorites, setFavorites] = useState(() => {
    try {
      const v = localStorage.getItem("quickeats_favorites");
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("quickeats_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("quickeats_favorites", JSON.stringify(favorites));
  }, [favorites]);

  
  function addItem(product, qty = 1) {
    setItems((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found)
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty || 1) + qty } : p
        );
      return [...prev, { ...product, qty }];
    });
    showToast(`${product.name} added to cart`);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQty(id, qty) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  }

  function clearCart() {
    setItems([]);
  }

  function total() {
    return items.reduce((s, it) => {
      const price = parseFloat(it.price) || 0;
      const quantity = parseInt(it.qty) || 1;
      return s + (price * quantity);
    }, 0);
  }

 
  function toggleFavorite(meal) {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === meal.id);
      if (exists) {
        showToast(`${meal.name} removed from favorites`);
        return prev.filter((f) => f.id !== meal.id);
      } else {
        showToast(`${meal.name} added to favorites`);
        return [...prev, meal];
      }
    });
  }

  function isFavorite(id) {
    return favorites.some((f) => f.id === id);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  const value = {
    items,
    favorites,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    total,
    toggleFavorite,
    isFavorite,
    toast,
    showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}