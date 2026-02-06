// src/state/menu/menu.action.js

export const GET_MENU_ITEMS_REQUEST = "menu/GET_MENU_ITEMS_REQUEST";
export const GET_MENU_ITEMS_REQUEST_SUCCESS =
  "menu/GET_MENU_ITEMS_REQUEST_SUCCESS";
export const GET_MENU_ITEMS_REQUEST_FAILURE =
  "menu/GET_MENU_ITEMS_REQUEST_FAILURE";

export const DELETE_MENU_ITEM_REQUEST = "menu/DELETE_MENU_ITEM_REQUEST";
export const DELETE_MENU_ITEM_SUCCESS = "menu/DELETE_MENU_ITEM_SUCCESS";
export const DELETE_MENU_ITEM_FAILURE = "menu/DELETE_MENU_ITEM_FAILURE";

export const CREATE_MENU_ITEM_REQUEST = "menu/CREATE_MENU_ITEM_REQUEST";
export const CREATE_MENU_ITEM_SUCCESS = "menu/CREATE_MENU_ITEM_SUCCESS";
export const CREATE_MENU_ITEM_FAILURE = "menu/CREATE_MENU_ITEM_FAILURE";

// ✅ Storage Key
const MENU_STORAGE_KEY = "quickeats_menu_items";

// ✅ helpers
const loadMenuFromStorage = () => {
  try {
    const saved = localStorage.getItem(MENU_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveMenuToStorage = (items) => {
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

// ✅ Get Menu Items
export const getMenuItemsByRestaurantId = ({ restaurantId }) => async (dispatch) => {
  try {
    dispatch({ type: GET_MENU_ITEMS_REQUEST });

    setTimeout(() => {
      const items = loadMenuFromStorage();

      // ✅ لو عايز تربط الأكلات بالمطعم نفسه
      const filtered = items.filter(
        (x) => String(x.restaurantId) === String(restaurantId)
      );

      dispatch({
        type: GET_MENU_ITEMS_REQUEST_SUCCESS,
        payload: filtered,
      });
    }, 100);
  } catch (error) {
    dispatch({
      type: GET_MENU_ITEMS_REQUEST_FAILURE,
      payload: error?.message || "Error loading menu items",
    });
  }
};

// ✅ Delete Menu Item
export const deleteFoodAction = ({ foodId }) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });

    setTimeout(() => {
      dispatch({
        type: DELETE_MENU_ITEM_SUCCESS,
        payload: foodId,
      });

      // ✅ احفظ بعد المسح
      const updated = getState().menu.menuItems.filter((x) => x.id !== foodId);
      saveMenuToStorage(updated);
    }, 100);
  } catch (error) {
    dispatch({
      type: DELETE_MENU_ITEM_FAILURE,
      payload: error?.message || "Error deleting menu item",
    });
  }
};

// ✅ Create Menu Item
export const createMenuItem = ({ menu }) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });

    const newItem = {
      ...menu,
      id: Date.now(),
      available: true,
      images: menu.images?.length ? menu.images : [],
    };

    setTimeout(() => {
      dispatch({
        type: CREATE_MENU_ITEM_SUCCESS,
        payload: newItem,
      });

      // ✅ احفظ في localStorage (مع الموجود)
      const current = loadMenuFromStorage();
      const updated = [newItem, ...current];
      saveMenuToStorage(updated);
    }, 100);
  } catch (error) {
    dispatch({
      type: CREATE_MENU_ITEM_FAILURE,
      payload: error?.message || "Error creating menu item",
    });
  }
};
