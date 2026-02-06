// src/state/restaurant/restaurant.action.js
import api from "../../api/api";
import {
  setUsersRestaurant,
  setAllRestaurants,
  addCategory,
  toggleRestaurantStatus,
} from "./restaurant.reducer";

/* ===========================
   Restaurants
=========================== */

// ✅ Get all restaurants (User side)
export const fetchAllRestaurants = () => async (dispatch) => {
  try {
    const res = await api.get("/api/restaurants");
    dispatch(setAllRestaurants(res.data));
  } catch (e) {
    console.error("fetchAllRestaurants error", e);
  }
};

/* ===========================
   Categories
=========================== */

// ✅ Create Food Category (Admin)
export const createCategoryAction =
  ({ reqData }) =>
  async (dispatch) => {
    try {
      // Backend endpoint
      const res = await api.post(
        "/api/admin/category",
        reqData
      );

      dispatch(addCategory(res.data));
    } catch (e) {
      console.error("createCategoryAction error", e);
    }
  };

/* ===========================
   Restaurant Status
=========================== */

export const updateRestaurantStatus =
  ({ restaurantId }) =>
  async (dispatch) => {
    try {
      const res = await api.put(
        `/api/admin/restaurants/${restaurantId}/status`
      );

      dispatch(setUsersRestaurant(res.data));
    } catch (e) {
      console.error("updateRestaurantStatus error", e);
    }
  };
