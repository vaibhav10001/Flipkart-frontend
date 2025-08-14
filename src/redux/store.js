import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import cartReducer from "./cartslice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // Persist only the User slice
};

// Combine reducers before applying persist
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Fix non-serializable warning
        }),
});

export const persistor = persistStore(store);
