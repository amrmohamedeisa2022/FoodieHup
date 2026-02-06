import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: [],
  category: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setCategories: (state, action) => {
      state.category = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
    toggleStock: (state, action) => {
      const ing = state.ingredients.find((x) => x.id === action.payload);
      if (ing) ing.inStoke = !ing.inStoke;
    },
  },
});

export const { setIngredients, setCategories, addIngredient, addCategory, toggleStock } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
