const express = require("express");
const validationResults = require("../../middleware/validationResult.middleware");
const router = express.Router();
const wifiOtaController = require("../../controller/wifiOta.controller");
const newWifiOtaValidation = require("../../validation/newWifiOta.validation");
const updateWifiOtaValidation = require("../../validation/updateWifiOta.validation");
const { param } = require("express-validator");

router.post(
  "/",
  newWifiOtaValidation,
  validationResults,
  wifiOtaController.createWifiOta
);

router.get("/", wifiOtaController.getAllWifiOta);

router.delete(
  "/:wifiOtaId",
  [param("wifiOtaId").isMongoId().withMessage("Invalid wifi Ota!")],
  validationResults,
  wifiOtaController.deleteWifiOta
);

router.patch(
  "/:wifiOtaId",
  updateWifiOtaValidation,
  validationResults,
  wifiOtaController.updateWifiOta
);

module.exports = router;
