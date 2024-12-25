import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer"; // Ensure correct path

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   whitelist: ["cart"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,


  // reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
  devTools: import.meta.env.VITE_ENABLE_REDUX_DEV_TOOLS === "true",
});

// export const persistor = persistStore(store);
export default store;
