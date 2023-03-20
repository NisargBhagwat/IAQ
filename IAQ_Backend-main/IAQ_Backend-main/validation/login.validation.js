const { body } = require("express-validator");

const signupValidation = [
  body("email").isEmail().withMessage("Invalid email"),

  body("password")
    .isString()
    .withMessage("password must be string!")
    .notEmpty()
    .withMessage("password required!")
    .trim(),
];

module.exports = signupValidation;
