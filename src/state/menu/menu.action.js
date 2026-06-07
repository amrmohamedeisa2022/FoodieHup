import api from "../../api/api";

/* ================= TYPES ================= */

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

/* ================= CREATE MENU ITEM ================= */

export const createMenuItem = ({ menu }) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });

    const res = await api.post(
      "/api/admin/food",
      menu,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({
      type: CREATE_MENU_ITEM_SUCCESS,
      payload: res.data,
    });

    console.log("✅ FOOD SAVED IN DATABASE:", res.data);

  } catch (error) {
    console.error("❌ CREATE FOOD ERROR:", error?.response?.data || error);

    dispatch({
      type: CREATE_MENU_ITEM_FAILURE,
      payload: error?.message || "Error creating menu item",
    });
  }
};

/* ================= GET MENU ITEMS ================= */

export const getMenuItemsByRestaurantId =
  ({ restaurantId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_MENU_ITEMS_REQUEST });

      const res = await api.get(
        `/api/food/restaurant/${restaurantId}?vagetarian=false&seasonal=false&nonveg=false`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      dispatch({
        type: GET_MENU_ITEMS_REQUEST_SUCCESS,
        payload: res.data,
      });

    } catch (error) {
      console.error("❌ GET MENU ERROR:", error);

      dispatch({
        type: GET_MENU_ITEMS_REQUEST_FAILURE,
        payload: error?.message || "Error loading menu items",
      });
    }
  };

/* ================= DELETE MENU ITEM ================= */

export const toggleFoodAvailability = ({ foodId }) => async (dispatch) => {
  try {
    const res = await api.put(
      `/api/admin/food/${foodId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    dispatch({
      type: "TOGGLE_AVAILABILITY_SUCCESS",
      payload: res.data,
    });

  } catch (error) {
    console.error("❌ TOGGLE ERROR:", error);
  }
};

export const deleteFoodAction =
  ({ foodId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_MENU_ITEM_REQUEST });

      await api.delete(
        `/api/admin/food/${foodId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      dispatch({
        type: DELETE_MENU_ITEM_SUCCESS,
        payload: foodId,
      });

      console.log("🗑️ FOOD DELETED");

    } catch (error) {
      console.error("❌ DELETE ERROR:", error);

      dispatch({
        type: DELETE_MENU_ITEM_FAILURE,
        payload: error?.message || "Error deleting menu item",
      });
    }
  };