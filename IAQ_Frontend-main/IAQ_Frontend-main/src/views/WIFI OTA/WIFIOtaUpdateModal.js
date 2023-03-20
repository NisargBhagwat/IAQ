import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useFormik } from "formik";
import {
  updateModalSchema,
  wifiOtaSchema,
} from "../../Constants/ValidationSchema";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  fetchAsyncCreateWifiOta,
  fetchAsyncUpdateWifiOta,
} from "../../Slices/WifiOtaSlice";

const WIFIOtaUpdateModal = ({ data }) => {
  const [visible, setVisible] = useState(false);

  const initialValues = {
    otaVersion: data.otaVersion,
    otaUrl: data.otaUrl,
    wifiStatus: data.status,
  };

  const handleClose = () => setVisible(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: wifiOtaSchema,
    onSubmit: async (values) => {
      try {
        const updateData = {
          otaVersion: values.otaVersion,
          otaUrl: values.otaUrl,
          status: values.wifiStatus ? true : false,
        };
        dispatch(fetchAsyncUpdateWifiOta({ ...updateData, id: data._id }));
        handleClose();
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <EditOutlined onClick={() => setVisible(true)} className="me-2" />
      <Modal
        title="Update Wi-Fi OTA"
        visible={visible}
        onCancel={handleClose}
        okText="Apply"
        width={600}
        onOk={formik.handleSubmit}
      >
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              <CCardBody>
                <Row>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextEmail"
                    name="otaVersion"
                  >
                    <Form.Label>Wi-Fi OTA Version</Form.Label>
                    <Col>
                      <Form.Control
                        {...formik.getFieldProps("otaVersion")}
                        type="text"
                        placeholder="OtaVersion"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <span className="mb-2" style={{ color: "red" }}>
                    {formik.errors.otaVersion}
                  </span>
                </Row>
                <Row>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextEmail"
                    name="otaUrl"
                  >
                    <Form.Label>Wi-Fi OTA URL</Form.Label>
                    <Col>
                      <Form.Control
                        {...formik.getFieldProps("otaUrl")}
                        type="text"
                        placeholder="OTAUrl"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <span className="mb-2" style={{ color: "red" }}>
                    {formik.errors.otaUrl}
                  </span>
                </Row>

                <Row>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                    name="wifiStatus"
                  >
                    <Form.Label>Wi-Fi OTA Status</Form.Label>
                    <Col>
                      <Form.Check
                        {...formik.getFieldProps("wifiStatus")}
                        type="switch"
                        id="custom-switch"
                        defaultChecked={data.status}
                      />
                    </Col>
                  </Form.Group>
                </Row>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </Modal>
    </>
  );
};

export default WIFIOtaUpdateModal;
