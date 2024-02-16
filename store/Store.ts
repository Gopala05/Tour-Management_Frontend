import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userDataReducer from "./UserSlice";

export interface RootState {
  userData: any;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userData"],
};

const rootReducer: Reducer<RootState> = combineReducers({
  userData: userDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
