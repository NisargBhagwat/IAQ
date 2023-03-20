import React from "react";
import CIcon from "@coreui/icons-react";
import { cilDevices, cilWifiSignal0, cilMemory } from "@coreui/icons";
import { CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "IAQ Devices",
    to: "/devices",
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Wi-Fi OTA",
    to: "/wifi-ota",
    icon: <CIcon icon={cilWifiSignal0} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "STM32 OTA",
    to: "/stm32-ota",
    icon: <CIcon icon={cilMemory} customClassName="nav-icon" />,
  },
];

export default _nav;
