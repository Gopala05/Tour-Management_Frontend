import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userDataReducer from "./UserSlice";
import adminDataReducer from "./AdminSlice";

export interface RootState {
  userData: any;
  adminData: any;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userData", "adminData"],
};

const rootReducer: Reducer<RootState> = combineReducers({
  userData: userDataReducer,
  adminData: adminDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
