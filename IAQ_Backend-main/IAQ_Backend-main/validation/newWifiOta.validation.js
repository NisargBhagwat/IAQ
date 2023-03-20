const { body } = require("express-validator");

const newWifiOtaValidation = [
  body("otaVersion")
    .isString()
    .withMessage("Ota Version must be string!")
    .notEmpty()
    .withMessage("Ota Version required!")
    .trim(),

  body("otaUrl")
    .isURL()
    .withMessage("Ota Url must be valid url!")
    .notEmpty()
    .withMessage("Ota Url required!")
    .trim(),

  body("status").isBoolean().withMessage("status must be Boolean!"),
];

module.exports = newWifiOtaValidation;
