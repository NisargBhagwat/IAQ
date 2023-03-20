const { body } = require("express-validator");

const signupValidation = [
  body("name")
    .isString()
    .withMessage("Name must be string!")
    .notEmpty()
    .withMessage("Name required!")
    .trim(),

  body("email").isEmail().withMessage("Invalid email"),

  body("password")
    .isString()
    .withMessage("password must be string!")
    .notEmpty()
    .withMessage("password required!")
    .trim(),
];

module.exports = signupValidation;
