import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./slices/userProfile";
import cartSlice  from "./slices/cart";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    cart: cartSlice,
  },
});
