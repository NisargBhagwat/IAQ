import React from "react";
const DOMAIN = process.env.REACT_APP_BASE_URL;

export const devices = "devices";
export const login = "login";
export const updateDevices = "updateDevices";

//  const Devices = React.lazy(() => import('./views/devices/Devices'))
import Devices from "./views/devices/Devices";
// const UpdateDevices = React.lazy(() => import('./views/devices/updateDevices'))

import STM32Ota from "./views/STM32Ota/STM32Ota";
import WIFIOta from "./views/WIFI OTA/WIFIOta";

const routes = [
  { path: "/devices", element: Devices },
  { path: "/stm32-ota", element: STM32Ota },
  { path: "/wifi-ota", element: WIFIOta },
];

export const signUpUrl = `${DOMAIN}/auth/signup`;
export const loginUrl = `${DOMAIN}/auth/login`;
export const createDeviceUrl = `${DOMAIN}/device/newDevice`;
export const updateDeviceUrl = `${DOMAIN}/device/updateDevice`;
export const getAllDeviceUrl = `${DOMAIN}/device`;
export const getDeviceByIdUrl = `${DOMAIN}/device`;
export const deleteDeviceUrl = `${DOMAIN}/device`;

export default routes;
