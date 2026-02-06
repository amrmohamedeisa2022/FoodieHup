import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },
  },
});

export const { addEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
