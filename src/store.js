import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/userSlice";
import ProductReducer from "./app/productSlice";
export let store = configureStore({
  reducer: {
    user: userReducer,
    product: ProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "user/login",
          "user/logout",
          "product/addProduct",
          "product/plusAmout",
        ],
        ignoredPaths: [
          "user.user",
          "product.addProduct",
          "product.product.1.createAt",
          "product.product.0.createAt",
          "product.product.*.createAt",
          "product.product.2.createAt",
        ],
      },
    }),
});
