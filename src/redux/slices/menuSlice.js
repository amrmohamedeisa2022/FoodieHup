import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItems: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
    addMenuItem: (state, action) => {
      
      state.menuItems = [action.payload, ...state.menuItems];
    },
    deleteMenuItem: (state, action) => {
      state.menuItems = state.menuItems.filter((x) => x.id !== action.payload);
    },
  },
});

export const { setMenuItems, addMenuItem, deleteMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
