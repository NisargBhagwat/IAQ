const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wifiOtaSchema = new mongoose.Schema({
  otaVersion: { type: String, required: true },
  otaUrl: { type: String, required: true },
  status: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("wifiOta", wifiOtaSchema);
