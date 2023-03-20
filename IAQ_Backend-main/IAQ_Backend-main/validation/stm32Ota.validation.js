const { body } = require("express-validator");

const newStm32OtaValidation = [
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

  body("otaCrc")
    .isString()
    .withMessage("Ota crc must be string!")
    .notEmpty()
    .withMessage("Ota crc required!")
    .trim(),
];

module.exports = {
  newStm32OtaValidation,
};
