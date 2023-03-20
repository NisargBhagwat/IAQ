const { body } = require("express-validator");

const newDeviceValidation = [
  body("deviceId")
  .isString()
  .withMessage("Device Id must be string!")
  .notEmpty()
  .withMessage("Device Id required!")
  .trim(),

  body("serialNo")
    .isString()
    .withMessage("Serial No must be string!")
    .notEmpty()
    .withMessage("Serial No required!")
    .trim(),

  body("macAddress")
    .isMACAddress()
    .withMessage("Invalid Mac Address"),

  body("wifiFirmwareVer")
    .isString()
    .withMessage("WiFi Firmware Version must be string!")
    .notEmpty()
    .withMessage("WiFi Firmware Version required!")
    .trim(),

  body("controllerFirmwareVer")
    .isString()
    .withMessage("Controller Firmware Version must be string!")
    .notEmpty()
    .withMessage("Controller Firmware Version required!")
    .trim(),

  body("wifiSSID")
    .isString()
    .withMessage("WiFi SSID must be string!")
    .notEmpty()
    .withMessage("WiFi SSID required!")
    .trim(),

  body("wifiPassword")
    .isString()
    .withMessage("WiFi Password must be string!")
    .notEmpty()
    .withMessage("WiFi Password required!")
    .trim(),
];

module.exports = newDeviceValidation;
