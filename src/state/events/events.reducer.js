import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },

    addEvent: (state, action) => {
      state.events = [action.payload, ...state.events]; // ✅ الجديد فوق
    },

    deleteEvent: (state, action) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },

    resetEvents: (state) => {
      state.events = [];
    },
  },
});

export const { setEvents, addEvent, deleteEvent, resetEvents } =
  eventsSlice.actions;

export default eventsSlice.reducer;
