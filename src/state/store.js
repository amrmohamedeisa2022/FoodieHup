import { configureStore } from "@reduxjs/toolkit";

import restaurantReducer from "./restaurant/restaurant.reducer";
import { menuReducer } from "./menu/menu.reducer";
import ingredientsReducer from "./ingredients/ingredients.reducer";
import { orderReducer } from "./order/order.reducer";

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    menu: menuReducer,
    ingredients: ingredientsReducer,
    restaurantOrder: orderReducer,
  },
});
