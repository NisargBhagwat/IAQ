import React, { useEffect, useState } from "react";

import { Card, Table, Button, Badge } from "antd";
import { fetchAsyncWifiOta, getAllWifiOta } from "../../Slices/WifiOtaSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  DeleteRowOutlined,
  EditOutlined,
} from "@ant-design/icons";
import WIFIOtaModal from "./WIFIOtaModal";
import { fetchAsyncDeleteWifiOta } from "../../Slices/WifiOtaSlice";
import WIFIOtaUpdateModal from "./WIFIOtaUpdateModal";

const WIFIOta = () => {
  const Data = useSelector(getAllWifiOta);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(fetchAsyncDeleteWifiOta(id));
  };
  let number = 0;
  const columns = [
    {
      title: "No",
      key: "no",
      render: () => (number = number + 1),
    },
    {
      title: "OTA Version",
      dataIndex: "otaVersion",
      key: "otaVersion",
    },
    {
      title: "OTA URL",
      dataIndex: "otaUrl",
      key: "otaUrl",
      ellipsis: true
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data) =>
        data ? (
          <Badge
            style={{
              backgroundColor: "#52c41a",
            }}
            count="Available"
          />
        ) : (
          <Badge
            style={{
              backgroundColor: "#FF0000",
            }}
            count="Not-Available"
          />
        ),
    },
    {
      title: "Actions",
      render: (data) => (
        <div>
          <WIFIOtaUpdateModal data={data} />
          <DeleteOutlined onClick={() => onDelete(data?._id)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <WIFIOtaModal show={visible} handleClose={() => setVisible(false)} />
      <Card
        title="Wi-Fi OTA"
        extra={
          <Button type="primary" onClick={() => setVisible(true)}>
            Create
          </Button>
        }
      >
        <Table columns={columns} dataSource={Data} />
      </Card>
    </>
  );
};

export default WIFIOta;
