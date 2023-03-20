import React from "react";
import { Modal } from "antd";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useFormik } from "formik";
import { STM32OtaSchema } from "../../Constants/ValidationSchema";

import { useDispatch } from "react-redux";
import { fetchAsyncCreateSTM32Ota } from "../../Slices/STM32OtaSlice";

const STM32OtaModal = ({ show, handleClose }) => {
  const initialValues = {
    otaVersion: "",
    otaUrl: "",
    wifiStatus: false,
    otaCrc: "",
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: STM32OtaSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const data = {
          otaVersion: values.otaVersion,
          otaUrl: values.otaUrl,
          status: values.wifiStatus ? true : false,
          otaCrc: values.otaCrc,
        };
        dispatch(fetchAsyncCreateSTM32Ota(data));
        handleClose();
        resetForm();
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <Modal
        title="Create STM32 Ota"
        visible={show}
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
                    <Form.Label>STM32 OTA Version</Form.Label>
                    <Col >
                      <Form.Control
                        type="text"
                        {...formik.getFieldProps("otaVersion")}
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
                    name="otaCrc"
                  >
                    <Form.Label>STM32 OTA CRC</Form.Label>
                    <Col>
                      <Form.Control
                        {...formik.getFieldProps("otaCrc")}
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
                    <Form.Label>STM32 OTA URL</Form.Label>
                    <Col>
                      <Form.Control
                        {...formik.getFieldProps("otaUrl")}
                        type="text"
                        placeholder="OTAUrl"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <span className="mb-2" style={{ color: "red" }}>{formik.errors.otaUrl}</span>
                </Row>

                <Row>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                    name="wifiStatus"
                  >
                    <Form.Label>STM32 OTA Status</Form.Label>
                    <Col>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        {...formik.getFieldProps("wifiStatus")}
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

export default STM32OtaModal;
