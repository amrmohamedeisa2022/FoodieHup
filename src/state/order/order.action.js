import { setOrders, updateOrderStatus } from "./order.reducer";
import api from "../../api/api";
const ORDERS_STORAGE_KEY = "quickeats_orders";


const loadOrdersFromStorage = () => {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};


const saveOrdersToStorage = (orders) => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {}
};

export const updateOrderStatusAPI =
  ({ orderId, orderStatus, jwt }) =>
  async (dispatch) => {
    try {
      await api.put(
        `/api/admin/order/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // 🔥 حدث الـ redux بعد التعديل
      dispatch(updateOrderStatus({ orderId, orderStatus }));

    } catch (error) {
      console.log("UPDATE ORDER ERROR:", error);
    }
  };

  export const cancelOrderAdminAPI =
  ({ orderId, jwt, restaurantId }) =>
  async (dispatch) => {
    try {
      await api.delete(
        `/api/admin/order/${orderId}/cancel`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("Order cancelled:", orderId);

      dispatch(fetchRestaurantsOrder({ jwt, restaurantId }));

    } catch (error) {
      console.log("CANCEL ORDER ERROR:", error.response?.data || error);
    }
  };




export const fetchRestaurantsOrder =
  ({ jwt, restaurantId }) =>
  async (dispatch) => {
    try {
      const res = await api.get(
        `/api/admin/order/restaurant/${restaurantId}/simple`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("FULL RESPONSE:", res.data);

      // 👇 الحل هنا
      let orders = [];

      if (Array.isArray(res.data)) {
        orders = res.data;
      } else if (Array.isArray(res.data.content)) {
        orders = res.data.content;
      } else if (res.data.orders) {
        orders = res.data.orders;
      }

      console.log("FINAL ORDERS:", orders);

      dispatch(setOrders(orders));
    } catch (error) {
      console.log("FETCH ORDER ERROR:", error.response?.data || error);
    }
  };

export const handleUpdateOrderStatus =
  ({ orderId, orderStatus, jwt }) =>
  async (dispatch, getState) => {
    dispatch(updateOrderStatus({ orderId, orderStatus }));

    const state = getState();
    const currentOrders = state.restaurantOrder.orders;

    
    saveOrdersToStorage(currentOrders);
  };
