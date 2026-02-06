import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: [],
  category: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    // ✅ تحميل كل الـ ingredients
    setIngredients: (state, action) => {
      state.ingredients = action.payload || [];
    },

    // ✅ تحميل كل الـ categories
    setCategories: (state, action) => {
      state.category = action.payload || [];
    },

    // ✅ إضافة ingredient جديد
    addIngredient: (state, action) => {
      state.ingredients = [action.payload, ...(state.ingredients || [])];
    },

    // ✅ إضافة category جديد
    addCategory: (state, action) => {
      state.category = [action.payload, ...(state.category || [])];
    },

    // ✅ تغيير حالة الستوك
    toggleStock: (state, action) => {
      const id = action.payload;
      const item = state.ingredients.find((x) => x.id === id);
      if (item) item.inStock = !item.inStock;
    },

    // ✅ Reset عند logout (لو احتجناه بعدين)
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
