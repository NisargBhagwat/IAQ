import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Card, Table, Badge, Button } from "antd";
import {
  fetchAsyncStm32Ota,
  getAllStm32Ota,
  fetchAsyncDeleteSTMOta,
} from "../../Slices/STM32OtaSlice";
import { DeleteOutlined } from "@ant-design/icons";
import STM32OtaModal from "./STM32OtpModal";
import STMOtaUpdateModal from "./STMOtaUpdateModal";

const STM32Ota = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const Data = useSelector(getAllStm32Ota);

  const onDelete = (id) => dispatch(fetchAsyncDeleteSTMOta(id));
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
      title: "OTA CRC",
      dataIndex: "otaCrc",
      key: "otaCrc",
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
      key: "actions",
      render: (data) => (
        <div>
          <STMOtaUpdateModal data={data} />
          <DeleteOutlined onClick={() => onDelete(data?._id)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <STM32OtaModal show={visible} handleClose={() => setVisible(false)} />
      <Card
        title="STM32 OTA"
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

export default STM32Ota;
