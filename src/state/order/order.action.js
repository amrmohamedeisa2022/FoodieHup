import { setOrders, updateOrderStatus } from "./order.reducer";

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


export const fetchRestaurantsOrder =
  ({ jwt, restaurantId }) =>
  async (dispatch) => {
    
    const allOrders = loadOrdersFromStorage();

    
    const restaurantOrders = allOrders.filter(
      (o) => String(o.restaurantId) === String(restaurantId)
    );

    dispatch(setOrders(restaurantOrders));
  };


export const handleUpdateOrderStatus =
  ({ orderId, orderStatus, jwt }) =>
  async (dispatch, getState) => {
    dispatch(updateOrderStatus({ orderId, orderStatus }));

    const state = getState();
    const currentOrders = state.restaurantOrder.orders;

    
    saveOrdersToStorage(currentOrders);
  };
