const express = require("express");
const router = express.Router();
const authRoutes = require("../V1/auth.router");
const deviceRoutes = require("../V1/device.route");
const wifiOtaRoutes = require("../V1/wifiOta.router");
const stm32OtaRoutes = require("../V1/stm32Ota.router");
const authorization = require("../../middleware/authorize.middleware");

router.use("/auth", authRoutes);

router.use(authorization);

router.use("/device", deviceRoutes);

router.use("/wifiOta", wifiOtaRoutes);

router.use("/stm32Ota", stm32OtaRoutes);

module.exports = router;
