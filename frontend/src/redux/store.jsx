import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import templeReducer from "./slices/templeSlice";
import cateogryReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    temple: templeReducer,
    category: cateogryReducer,
  },
});
