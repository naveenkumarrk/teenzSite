import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartReducer from "../slices/CartSlice";

const persistConfig = {
  key: "cart", // Specify the key for the persisted reducer
  version: 1, // Optional, helps with state migrations
  storage, // Use localStorage for web
};

const persistedReducer = persistReducer(persistConfig, CartReducer);

export const store = configureStore({
  reducer: { cart: persistedReducer }, // Use 'cart' as the state key
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
