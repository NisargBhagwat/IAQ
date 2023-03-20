const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wifiSSIDSchema = new mongoose.Schema({
  value: { type: String, requrired: true },
  status: { type: Boolean, default: false },
});

const wifiPasswordSchema = new mongoose.Schema({
  value: { type: String, requrired: true },
  status: { type: Boolean, default: false },
});

const wifiOTASchema = new mongoose.Schema({
  value: { type: mongoose.Types.ObjectId, ref: "wifiOta", default: null },
  status: { type: Boolean, default: false },
});

const stm32OTASchema = new mongoose.Schema({
  value: { type: mongoose.Types.ObjectId, ref: "stm32Ota", default: null },
  status: { type: Boolean, default: false },
});

const deviceSchema = new mongoose.Schema({
  deviceId: { type: Number, required: true },
  serialNo: { type: String, default: null },
  macAddress: { type: String, required: true },
  signalStrength: { type: Number, required: true },
  wifiFirmwareVer: { type: Number, required: true },
  controllerFirmwareVer: { type: Number, required: true },
  currentWifiSSID: { type: String, required: true },
  wifiSSID: { type: wifiSSIDSchema, default: null },
  wifiPassword: { type: wifiPasswordSchema, default: null },
  wifiOTA: { type: wifiOTASchema, default: null },
  stm32OTA: { type: stm32OTASchema, default: null },
});

module.exports = mongoose.model("device", deviceSchema);
