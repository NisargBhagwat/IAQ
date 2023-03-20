import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useFormik } from "formik";
import { updateModalSchema } from "../../Constants/ValidationSchema";
import { WifiOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { fetchAsyncUpdateWifiInfo } from "../../Slices/DeviceSlice";
import { Badge } from "antd";

const UpdateWifiInfo = ({ data }) => {
  console.log(data);
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(false);
  const initialValues = {
    serialNo: data.serialNo ? data.serialNo : "",
    macAddress: data.macAddress || "",
    currentWifiSSID: data.currentWifiSSID || "",
    signalStrength: data.signalStrength || "",
    wifiSSID: (data.wifiSSID && data.wifiSSID.value) || "",
    wifiPassword: "",
  };

  const dispatch = useDispatch();
  const handleClose = () => setVisible(false);

  const formik = useFormik({
    initialValues,
    validationSchema: updateModalSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const updatedData = {
          ...(values.serialNo.trim().length && {
            serialNo: values.serialNo.trim(),
          }),
          wifiSSID: values.wifiSSID,
          ...(values.wifiPassword.trim().length && {
            wifiPassword: values.wifiPassword.trim(),
          }),
          wifiPasswordCheck: disable,
        };
        dispatch(fetchAsyncUpdateWifiInfo({ ...updatedData, id: data._id }));
        handleClose();
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <WifiOutlined onClick={() => setVisible(true)} />
      <Modal
        title="Update Wi-Fi Details"
        visible={visible}
        onCancel={() => setVisible(false)}
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
                      name="serialNo"
                    >
                      <Form.Label>Serial Number</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          {...formik.getFieldProps("serialNo")}
                          type="text"
                          placeholder="serialNo"
                          required
                        />
                      </Col>
                    </Form.Group>
                    <span className="mb-2" style={{ color: "red" }}>
                      {formik.errors.serialNo}
                    </span>
                  </Col>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label>MAC Address</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="macAddress"
                          readOnly
                          disabled={true}
                          required
                          {...formik.getFieldProps("macAddress")}
                        />
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
                    >
                      <Form.Label>Current SSID</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Current SSID"
                          required
                          disabled={true}
                          readOnly
                          {...formik.getFieldProps("currentWifiSSID")}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label>Current Wi-Fi Signal Strength</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="Signal Strength"
                          disabled={true}
                          readOnly
                          {...formik.getFieldProps("signalStrength")}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                      name="wifiSSID"
                    >
                      <Form.Label>Wi-Fi SSID</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          placeholder="wifiSSID"
                          required
                          {...formik.getFieldProps("wifiSSID")}
                        />
                      </Col>
                    </Form.Group>
                    <span className="mb-2" style={{ color: "red" }}>
                      {formik.errors.wifiSSID}
                    </span>
                  </Col>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label>Wi-Fi SSID Status</Form.Label>
                      <Col sm="10">
                        {!data.wifiSSID || data.wifiSSID.status === true ? (
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
                      controlId="formPlaintextPassword"
                      name="wifiPassword"
                    >
                      <Form.Label>Wi-Fi Password</Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="password"
                          placeholder="Wifi Password"
                          disabled={disable}
                          {...formik.getFieldProps("wifiPassword")}
                        />
                      </Col>
                    </Form.Group>
                    <span className="mb-2" style={{ color: "red" }}>
                      {formik.errors.wifiPassword}
                    </span>
                  </Col>
                  <Col>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label>Wi-Fi Password Status</Form.Label>
                      <Col sm="15">
                        {!data.wifiPassword ||
                        data.wifiPassword.status === true ? (
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
                      controlId="formPlaintextPassword"
                      name="wifiPasswordCheck"
                    >
                      <Col sm="10">
                        <Form.Check
                          label={"Wi-Fi Password Not-Available"}
                          id={`default`}
                          onChange={() => setDisable(!disable)}
                        />
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

export default UpdateWifiInfo;
