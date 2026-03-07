import {
  addCategory,
  addIngredient,
  setCategories,
  setIngredients,
  toggleStock,
} from "./ingredients.reducer";


const INGREDIENTS_KEY = "quickeats_ingredients";
const INGREDIENT_CATEGORIES_KEY = "quickeats_ingredient_categories";


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


export const getIngredientsOfRestaurant =
  ({ jwt, id }) =>
  async (dispatch) => {
    
    const all = loadFromStorage(INGREDIENTS_KEY, []);

    
    const restaurantIngredients = all.filter((x) => x.restaurantId === id);

    dispatch(setIngredients(restaurantIngredients));
  };


export const getIngredientCategory =
  ({ id, jwt }) =>
  async (dispatch) => {
    
    const all = loadFromStorage(INGREDIENT_CATEGORIES_KEY, []);

    
    const restaurantCats = all.filter((x) => x.restaurantId === id);

    dispatch(setCategories(restaurantCats));
  };


export const createIngredientCategory =
  ({ data, jwt }) =>
  async (dispatch) => {
    
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


export const createIngredient =
  ({ data, jwt }) =>
  async (dispatch) => {
    
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


export const updateStockIngredient =
  ({ id, jwt }) =>
  async (dispatch, getState) => {
    dispatch(toggleStock(id));

    
    const current = getState().ingredients.ingredients || [];
    const all = loadFromStorage(INGREDIENTS_KEY, []);

    
    const updatedAll = all.map((x) =>
      x.id === id ? current.find((y) => y.id === id) || x : x
    );

    saveToStorage(INGREDIENTS_KEY, updatedAll);
  };
