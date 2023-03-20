const express = require("express");
const validationResults = require("../../middleware/validationResult.middleware");
const router = express.Router();
const deviceController = require("../../controller/device.controller");
const newDeviceValidation = require("../../validation/newDevice.validation");
const updateDeviceValidation = require("../../validation/updateDevice.validation");
const { param } = require("express-validator");
const { updateOtaValidation } = require("../../validation/ota.validation");

router.get("/", deviceController.getDevices);

router.get(
  "/:deviceId",
  [param("deviceId").isMongoId().withMessage("Invalid Device")],
  validationResults,
  deviceController.getDevice
);

router.post("/newDevice", deviceController.createDevice);

router.patch(
  "/updateWifiInfo/:deviceId",
  updateDeviceValidation,
  validationResults,
  deviceController.updateWifiInfo
);

router.patch(
  "/updateOtaInfo/:deviceId",
  updateOtaValidation,
  validationResults,
  deviceController.updateOtaInfo
);

router.delete(
  "/:deviceId",
  [param("deviceId").isMongoId().withMessage("Invalid Device")],
  validationResults,
  deviceController.deleteDevice
);

module.exports = router;
