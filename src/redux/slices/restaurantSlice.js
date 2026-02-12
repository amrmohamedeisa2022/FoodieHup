import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersRestaurant: null,
  categories: [
    { id: 1, name: "Pizza" },
    { id: 2, name: "Burger" },
  ],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {

    setUsersRestaurant: (state, action) => {
      state.usersRestaurant = action.payload;
    },

    toggleRestaurantStatus: (state) => {
      if (state.usersRestaurant) {
        state.usersRestaurant.open = !state.usersRestaurant.open;
      }
    },

    addCategory: (state, action) => {
      state.categories.push({
        id: Date.now(),
        name: action.payload.name,
      });
    },
  },
});

export const {
  setUsersRestaurant,
  toggleRestaurantStatus,
  addCategory
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
