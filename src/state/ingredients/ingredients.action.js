import {
  addCategory,
  addIngredient,
  setCategories,
  setIngredients,
  toggleStock,
} from "./ingredients.reducer";

// ✅ Storage Keys
const INGREDIENTS_KEY = "quickeats_ingredients";
const INGREDIENT_CATEGORIES_KEY = "quickeats_ingredient_categories";

// ✅ Helpers
const loadFromStorage = (key, fallback = []) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

// ✅ Get Ingredients Of Restaurant
export const getIngredientsOfRestaurant =
  ({ jwt, id }) =>
  async (dispatch) => {
    // id = restaurantId
    const all = loadFromStorage(INGREDIENTS_KEY, []);

    // ✅ فلترة حسب المطعم
    const restaurantIngredients = all.filter((x) => x.restaurantId === id);

    dispatch(setIngredients(restaurantIngredients));
  };

// ✅ Get Ingredient Categories
export const getIngredientCategory =
  ({ id, jwt }) =>
  async (dispatch) => {
    // id = restaurantId
    const all = loadFromStorage(INGREDIENT_CATEGORIES_KEY, []);

    // ✅ فلترة حسب المطعم
    const restaurantCats = all.filter((x) => x.restaurantId === id);

    dispatch(setCategories(restaurantCats));
  };

// ✅ Create Ingredient Category
export const createIngredientCategory =
  ({ data, jwt }) =>
  async (dispatch) => {
    // data = { name, restaurantId }
    const all = loadFromStorage(INGREDIENT_CATEGORIES_KEY, []);

    const newCategory = {
      id: Date.now(),
      name: data.name,
      restaurantId: data.restaurantId,
    };

    const updated = [newCategory, ...all];
    saveToStorage(INGREDIENT_CATEGORIES_KEY, updated);

    dispatch(addCategory(newCategory));
  };

// ✅ Create Ingredient
export const createIngredient =
  ({ data, jwt }) =>
  async (dispatch) => {
    // data = { name, categoryId, restaurantId }
    const allIngredients = loadFromStorage(INGREDIENTS_KEY, []);
    const allCats = loadFromStorage(INGREDIENT_CATEGORIES_KEY, []);

    const cat = allCats.find((c) => c.id === data.categoryId);

    const newIngredient = {
      id: Date.now(),
      name: data.name,
      restaurantId: data.restaurantId,
      category: cat ? { id: cat.id, name: cat.name } : null,
      inStock: true,
    };

    const updated = [newIngredient, ...allIngredients];
    saveToStorage(INGREDIENTS_KEY, updated);

    dispatch(addIngredient(newIngredient));
  };

// ✅ Update Stock Ingredient
export const updateStockIngredient =
  ({ id, jwt }) =>
  async (dispatch, getState) => {
    dispatch(toggleStock(id));

    // ✅ بعد التعديل احفظ في localStorage
    const current = getState().ingredients.ingredients || [];
    const all = loadFromStorage(INGREDIENTS_KEY, []);

    // ✅ نعدّل العنصر جوه الـ all
    const updatedAll = all.map((x) =>
      x.id === id ? current.find((y) => y.id === id) || x : x
    );

    saveToStorage(INGREDIENTS_KEY, updatedAll);
  };
