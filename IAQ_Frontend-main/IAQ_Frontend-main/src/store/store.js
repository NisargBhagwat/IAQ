import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Auth";
import STM32OtaReducer from "../Slices/STM32OtaSlice";
import WifiOtaReducer from "../Slices/WifiOtaSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { deviceSlice } from "../Slices/DeviceSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  auth: authSlice.reducer,
  stm32Ota: STM32OtaReducer,
  wifiOta: WifiOtaReducer,
  devices: deviceSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
