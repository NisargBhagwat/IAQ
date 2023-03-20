import React, { useState, useRef, useEffect } from "react";
import { Table, Card, Input } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { getAllDevices } from "../../Slices/DeviceSlice";
import { useSelector } from "react-redux";
import UpdateWifiInfo from "./UpdateWifiInfo";
import UpdateOtaInfo from "./UpdateOtaInfo";
const { Search } = Input;

const Device = () => {
  const devices = useSelector(getAllDevices);
  const [searchedDevices, setSearchedDevices] = useState([]);
  const [searchText,  setSearchText] = useState("");
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setSearchedDevices(devices);
  }, [devices]);

  useEffect(() => {
    const searchedDevices = devices.filter((device) => {
      if (
        ""
          .concat(
            device.serialNo || "NA",
            device.macAddress,
            device.wifiFirmwareVer,
            device.deviceId,
            device.controllerFirmwareVer,
            device.controllerFirmwareVer,
            (device.wifiSSID && device.wifiSSID.value) || "NA"
          )
          .includes(searchText)
      ) {
        return true;
      }
      return false;
    });
    setSearchedDevices(searchedDevices);
  }, [searchText, devices]);

  const columns = [
    {
      title: "No",
      key: "no",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Serial Number",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (data) => (data ? data : "NA"),
    },
    {
      title: "Device Id",
      dataIndex: "deviceId",
      key: "deviceId",
      render: (data) => (data ? data : "NA"),
    },
    {
      title: "MAC Address",
      dataIndex: "macAddress",
      key: "macAddress",
    },
    {
      title: "Wi-Fi Firmware Version",
      dataIndex: "wifiFirmwareVer",
      key: "wifiFirmwareVer",
    },
    {
      title: "Controller Firmware Version",
      dataIndex: "controllerFirmwareVer",
      key: "controllerFirmwareVer",
    },
    {
      title: "Wi-Fi SSID",
      dataIndex: "wifiSSID",
      key: "wifiSSID",
      render: (data) => (data ? data.value : "NA"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (data) => (
        <div key={data._id}>
          <UpdateOtaInfo data={data} />
          <UpdateWifiInfo data={data} />
        </div>
      ),
    },
  ];
  return (
    <>
      <Card
        title="Devices"
        extra={
          <Search
            placeholder="input search text"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: 225,
            }}
          />
        }
      >
        <Table
          dataSource={searchedDevices}
          columns={columns}
          pagination={{
            onChange(current) {
              setPage(current);
            },
          }}
        />
      </Card>
    </>
  );
};

export default Device;
