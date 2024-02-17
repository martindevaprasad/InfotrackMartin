import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const tableSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.items = action.payload;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    }
  }
});

export const { setData, deleteItem } = tableSlice.actions;

export default tableSlice.reducer;
