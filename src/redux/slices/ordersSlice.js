import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "restaurantOrder",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, orderStatus } = action.payload;
      const order = state.orders.find((x) => x.id === orderId);
      if (order) order.orderStatus = orderStatus;
    },
  },
});

export const { setOrders, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
