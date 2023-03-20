const express = require("express");
const validationResults = require("../../middleware/validationResult.middleware");
const router = express.Router();
const stm32OtaController = require("../../controller/stm32Ota.controller");
const newWifiOtaValidation = require("../../validation/newWifiOta.validation");
const updateWifiOtaValidation = require("../../validation/updateWifiOta.validation");
const { param } = require("express-validator");
const {
  newStm32OtaValidation,
} = require("../../validation/stm32Ota.validation");

router.post(
  "/",
  newStm32OtaValidation,
  validationResults,
  stm32OtaController.createStm32Ota
);

router.get("/", stm32OtaController.getAllStm32Ota);

router.delete(
  "/:stm32OtaId",
  [param("stm32OtaId").isMongoId().withMessage("Invalid stm32-Ota Id!")],
  validationResults,
  stm32OtaController.deleteStm32Ota
);

router.patch(
  "/:stm32OtaId",
  [param("stm32OtaId").isMongoId().withMessage("Invalid stm32-Ota Id!")],
  newStm32OtaValidation,
  validationResults,
  stm32OtaController.updateStm32Ota
);

module.exports = router;
