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
      state.ingredients = action.payload || [];
    },

    
    setCategories: (state, action) => {
      state.category = action.payload || [];
    },

    
    addIngredient: (state, action) => {
      state.ingredients = [action.payload, ...(state.ingredients || [])];
    },

    
    addCategory: (state, action) => {
      state.category = [action.payload, ...(state.category || [])];
    },

    
    toggleStock: (state, action) => {
      const id = action.payload;
      const item = state.ingredients.find((x) => x.id === id);
      if (item) item.inStock = !item.inStock;
    },

   
    resetIngredients: (state) => {
      state.ingredients = [];
      state.category = [];
    },
  },
});

export const {
  setIngredients,
  setCategories,
  addIngredient,
  addCategory,
  toggleStock,
  resetIngredients,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
