import { setOrders, updateOrderStatus } from "./order.reducer";

const ORDERS_STORAGE_KEY = "quickeats_orders";

// ✅ Load from storage
const loadOrdersFromStorage = () => {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// ✅ Save to storage
const saveOrdersToStorage = (orders) => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {}
};

// ✅ Fetch restaurant orders
export const fetchRestaurantsOrder =
  ({ jwt, restaurantId }) =>
  async (dispatch) => {
    // دلوقتي هنجيب الطلبات من التخزين
    const allOrders = loadOrdersFromStorage();

    // ✅ فلترة حسب restaurantId
    const restaurantOrders = allOrders.filter(
      (o) => String(o.restaurantId) === String(restaurantId)
    );

    dispatch(setOrders(restaurantOrders));
  };

// ✅ Update order status
export const handleUpdateOrderStatus =
  ({ orderId, orderStatus, jwt }) =>
  async (dispatch, getState) => {
    dispatch(updateOrderStatus({ orderId, orderStatus }));

    const state = getState();
    const currentOrders = state.restaurantOrder.orders;

    // ✅ نحفظ بعد التعديل
    saveOrdersToStorage(currentOrders);
  };
