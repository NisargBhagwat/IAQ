const { body, param } = require("express-validator");

const updateOtaValidation = [
  param("deviceId").isMongoId().withMessage("Invalid DeviceId!"),

  body("wifiOTA").optional().isMongoId().withMessage("Invalid Wifi Ota!"),

  body("stm32OTA").optional().isMongoId().withMessage("Invalid stm32 Ota!"),
];

module.exports = {
  updateOtaValidation,
};
