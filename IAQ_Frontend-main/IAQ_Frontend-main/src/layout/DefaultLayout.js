import React, { useEffect, useState } from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncDevices } from "../Slices/DeviceSlice";
import { fetchAsyncStm32Ota } from "../Slices/STM32OtaSlice";
import { fetchAsyncWifiOta } from "../Slices/WifiOtaSlice";

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(true);
  useEffect(() => {
    dispatch(fetchAsyncDevices());
    dispatch(fetchAsyncStm32Ota());
    dispatch(fetchAsyncWifiOta  ());

  }, []);

  return (
    <div>
      <AppSidebar showSidebar={showSidebar}/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
