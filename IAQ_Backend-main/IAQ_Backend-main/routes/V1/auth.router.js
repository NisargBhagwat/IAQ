const express = require("express");
const validationResults = require("../../middleware/validationResult.middleware");
const router = express.Router();
const authController = require("../../controller/auth.controller");
const signupValidation = require("../../validation/signup.validation");
const loginValidation = require("../../validation/login.validation");

router.post("/login", loginValidation, validationResults, authController.login);

router.post(
  "/signUp",
  signupValidation,
  validationResults,
  authController.signUp
);

module.exports = router;
