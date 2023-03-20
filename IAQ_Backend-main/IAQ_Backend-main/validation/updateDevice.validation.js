const { body, param } = require("express-validator");

const updateDeviceValidation = [
  param("deviceId").isMongoId().withMessage("Invalid DeviceId"),

  body("serialNo")
    .optional()
    .isString()
    .withMessage("Serial No must be string!")
    .notEmpty()
    .withMessage("Serial No required!")
    .trim(),

  body("wifiSSID")
    .optional()
    .isString()
    .withMessage("WiFi SSID must be string!")
    .notEmpty()
    .withMessage("WiFi SSID required!")
    .trim(),

  body("wifiPassword")
    .optional()
    .isString()
    .withMessage("WiFi Password must be string!")
    .notEmpty()
    .withMessage("WiFi Password required!")
    .trim(),
];

module.exports = updateDeviceValidation;
