import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useFormik } from "formik";
import {
  updateModalSchema,
  updateOTASchma,
  wifiOtaSchema,
} from "../../Constants/ValidationSchema";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import {
  fetchAsyncUpdateWifiOta,
  getAllWifiOta,
} from "../../Slices/WifiOtaSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllStm32Ota } from "../../Slices/STM32OtaSlice";
import { fetchAsyncUpdateOTAInfo } from "../../Slices/DeviceSlice";
import { Badge } from "antd";
import { toast } from "react-toastify";

const UpdateOtaInfo = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const stm32Otas = useSelector(getAllStm32Ota);
  const wifiOtas = useSelector(getAllWifiOta);

  const initialValues = {
    wifiOTA: (data.wifiOTA && data.wifiOTA.value) || "",
    stm32OTA: (data.stm32OTA && data.stm32OTA.value) || "",
  };
  
  const handleClose = () => setVisible(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: updateOTASchma,
    onSubmit: async (values) => {
      try {
        const body = {
          ...(values.wifiOTA !== "" && { wifiOTA: values.wifiOTA }),
          ...(values.stm32OTA !== "" && { stm32OTA: values.stm32OTA }),
        };
        dispatch(fetchAsyncUpdateOTAInfo({ ...body, id: data._id }));
        handleClose();
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <SettingOutlined onClick={() => setVisible(true)} className="me-2" />
      <Modal
        title="Update OTA Details"
        visible={visible}
        onCancel={handleClose}
        okText="Apply"
        width={700}
        onOk={formik.handleSubmit}
      >
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              <CCardBody>
                <Row>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                      name="otaVersion"
                    >
                      <Form.Label>Wi-Fi OTA Version</Form.Label>
                      <Col>
                        <Form.Select
                          aria-label="Default select example"
                          {...formik.getFieldProps("wifiOTA")}
                        >
                          <option value="">select Wi-Fi OTA Version</option>
                          {wifiOtas.map((ota) => {
                            return (
                              <option value={`${ota._id}`}>
                                {ota.otaVersion}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Col>
                    </Form.Group>
                    <span className="mb-2" style={{ color: "red" }}>
                      {formik.errors.wifiOTA}
                    </span>
                  </Col>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label>Wi-Fi OTA Status</Form.Label>
                      <Col sm="10">
                        {!data.wifiOTA || data.wifiOTA.status === true ? (
                          <Badge
                            style={{
                              backgroundColor: "#52c41a",
                              width: "50px",
                            }}
                            count="Save"
                          />
                        ) : (
                          <Badge
                            style={{
                              backgroundColor: "#ffc107",
                            }}
                            count="Submit"
                          />
                        )}
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                      name="otaUrl"
                    >
                      <Form.Label>STM32 OTA version</Form.Label>
                      <Col>
                        <Form.Select
                          aria-label="Default select example"
                          {...formik.getFieldProps("stm32OTA")}
                        >
                          <option value="">select STM32 OTA version</option>
                          {stm32Otas.map((ota) => {
                            return (
                              <option value={ota._id}>{ota.otaVersion}</option>
                            );
                          })}
                        </Form.Select>
                      </Col>
                    </Form.Group>
                    <span className="mb-2" style={{ color: "red" }}>
                      {formik.errors.stm32OTA}
                    </span>
                  </Col>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label>STM32 OTA Status</Form.Label>
                      <Col sm="10">
                        {!data.stm32OTA || data.stm32OTA.status === true ? (
                          <Badge
                            style={{
                              backgroundColor: "#52c41a",
                              width: "50px",
                            }}
                            count="Save"
                          />
                        ) : (
                          <Badge
                            style={{
                              backgroundColor: "#ffc107",
                            }}
                            count="Submit"
                          />
                        )}
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </Modal>
    </>
  );
};

export default UpdateOtaInfo;
