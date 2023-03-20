const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stm32OtaSchema = new mongoose.Schema({
  otaVersion: { type: String, required: true },
  otaUrl: { type: String, required: true },
  otaCrc: { type: String, required: true },
  status: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("stm32Ota", stm32OtaSchema);
