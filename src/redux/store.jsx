import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./TableSlice";

const store = configureStore({
  reducer: {
    data: tableReducer
  }
});

export default store;
