import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersRestaurant: {
    id: 1,
    name: "My Restaurant",
    cuisineType: "Fast Food",
    openingHours: "Mon-Sun : 9:00 AM - 12:00 PM",
    open: true,
    owner: { fullName: "Owner Name" },
    contactInformation: {
      email: "owner@test.com",
      mobile: "01000000000",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
  },

  categories: [
    { id: 1, name: "Pizza" },
    { id: 2, name: "Burger" },
  ],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    toggleRestaurantStatus: (state) => {
      state.usersRestaurant.open = !state.usersRestaurant.open;
    },

    addCategory: (state, action) => {
      state.categories.push({
        id: Date.now(),
        name: action.payload.name,
      });
    },
  },
});

export const { toggleRestaurantStatus, addCategory } = restaurantSlice.actions;

export default restaurantSlice.reducer;
