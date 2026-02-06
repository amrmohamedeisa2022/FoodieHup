import { configureStore } from "@reduxjs/toolkit";

import restaurantReducer from "./slices/restaurantSlice";
import menuReducer from "./slices/menuSlice";
import ingredientsReducer from "./slices/ingredientsSlice";
import ordersReducer from "./slices/ordersSlice";
import eventsReducer from "./slices/eventsSlice";

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    menu: menuReducer,
    ingredients: ingredientsReducer,
    restaurantOrder: ordersReducer,
    events: eventsReducer,
  },
});
