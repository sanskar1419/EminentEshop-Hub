/* Importing reducer function and configure store function */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { userReducer } from "./slice/userSlice";
import { productReducer } from "./slice/productSlice";

/* Config object for persist store */
const persistConfig = {
  key: "root",
  storage,
};

/* Combining Both Reducer */
const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
});

/* Enhanced reducer with configuration to persist the rootReducer state to local storage. */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Creating Redux Store */
export const store = configureStore({
  reducer: persistedReducer,
  //   devTools: process.env.NODE_ENV !== "production",
  //   middleware: [thunk],
});

/* Making it persist to local storage */
export const persistor = persistStore(store);
