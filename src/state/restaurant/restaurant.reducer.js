import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersRestaurant: null,     
  allRestaurants: [],        
  categories: [],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setUsersRestaurant: (state, action) => {
      state.usersRestaurant = action.payload;
    },

    setAllRestaurants: (state, action) => {
      state.allRestaurants = action.payload;
    },

    toggleRestaurantStatus: (state) => {
      if (state.usersRestaurant) {
        state.usersRestaurant.open = !state.usersRestaurant.open;
      }
    },

    addCategory: (state, action) => {
      state.categories.push({
        id: action.payload.id || Date.now(),
        name: action.payload.name,
      });
    },

    logoutRestaurant: (state) => {
      state.usersRestaurant = null;
      state.categories = [];
    },
  },
});

export const {
  setUsersRestaurant,
  setAllRestaurants,
  toggleRestaurantStatus,
  addCategory,
  logoutRestaurant,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
