import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
