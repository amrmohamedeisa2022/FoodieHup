import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState(null);

  const token = localStorage.getItem("quickeats_token");

  async function loadCart() {
  try {
    const res = await api.get("/api/cart/details", { // 🔥 غير هنا
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("CART API:", res.data);

    // 🔥 مفيش item خلاص
    const mapped = res.data.map((i) => ({
      id: i.foodId,
      cartItemId: i.id,
      name: i.name,
      price: i.price,
      qty: i.quantity,
      restaurantId: i.restaurantId,
    }));

    setItems(mapped);
  } catch (e) {
    console.error("Failed to load cart", e);
  }
}

  // ✅ load عند بداية الصفحة
  useEffect(() => {
    if (token) loadCart();
  }, [token]);

  // ✅ ADD ITEM
  async function addItem(product, qty = 1) {
    try {
      await api.put(
        "/api/cart/add",
        {
          foodId: product.id,
          quantity: qty,
          ingredients: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await loadCart(); // 🔥 مهم

      showToast(`${product.name} added to cart`);
    } catch (e) {
      console.error("Add failed", e);
    }
  }

  // ❌ REMOVE (frontend فقط)
  function removeItem(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  // 🔥 UPDATE QTY
  async function updateQty(cartItemId, qty) {
    if (!cartItemId) {
      console.error("cartItemId is null ❌");
      return;
    }

    try {
      await api.put(
        "/api/cart-item/update",
        {
          cartItemId,
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await loadCart(); // 🔥 مهم
    } catch (e) {
      console.error("Update failed", e);
    }
  }

  // 🧹 CLEAR
  function clearCart() {
    setItems([]);
  }

  // 💰 TOTAL
  function total() {
    return items.reduce((s, it) => {
      const price = parseFloat(it.price) || 0;
      const quantity = parseInt(it.qty) || 1;
      return s + price * quantity;
    }, 0);
  }

  // ❤️ FAVORITES
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

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}