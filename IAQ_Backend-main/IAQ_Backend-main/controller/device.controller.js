const Device = require("../model/device.model");
const HttpException = require("../utils/HttpException");
const HttpStatus = require("../utils/HttpStatus");
const { hash, compare } = require("bcrypt");
const responseHandler = require("../utils/responseHandler");

const createDevice = async (req, res, next) => {
  try {
    const { macAddress, wifiPassword, wifiSSID } = req.body;

    const foundDevice = await Device.findOne({ macAddress });

    if (foundDevice)
      throw new HttpException(
        "Mac Address already Exists!",
        HttpStatus.CONFLICT
      );

    const newDevice = await Device.create({
      ...req.body,
    });

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler("Device created successfully", HttpStatus.OK, newDevice)
      );
  } catch (err) {
    next(err);
  }
};

const updateWifiInfo = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    let { wifiPassword, serialNo, wifiSSID, wifiPasswordCheck } = req.body;
    const existDevice = await Device.findOne({ _id: deviceId });

    if (!existDevice)
      throw new HttpException("Device is not exists", HttpStatus.NOT_FOUND);

    let mongoSet = {
      ...(serialNo && { serialNo }),
    };

    if (wifiPasswordCheck) {
      mongoSet["wifiPassword"] = { value: "", status: false };
    } else if (
      wifiPassword &&
      wifiPassword !==
        (existDevice.wifiPassword && existDevice.wifiPassword.value)
    ) {
      mongoSet["wifiPassword"] = { value: wifiPassword, status: false };
    }

    if (wifiSSID !== (existDevice.wifiSSID && existDevice.wifiSSID.value)) {
      mongoSet["wifiSSID"] = { value: wifiSSID, status: false };
    }
    const updateDevice = await Device.findOneAndUpdate(
      { _id: deviceId },
      { ...mongoSet },
      { new: true }
    );

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "Device updated successfully",
          HttpStatus.OK,
          updateDevice
        )
      );
  } catch (err) {
    next(err);
  }
};

const updateOtaInfo = async (req, res, next) => {
  try {
    const { wifiOTA, stm32OTA } = req.body;
    const { deviceId } = req.params;

    const existDevice = await Device.findOne({ _id: deviceId });

    if (!existDevice)
      throw new HttpException("Device is not exists", HttpStatus.NOT_FOUND);

    let mongoSet = {};
    if (
      wifiOTA &&
      wifiOTA !== (existDevice.wifiOTA && existDevice.wifiOTA.value.toString())
    ) {
      mongoSet["wifiOTA"] = { value: wifiOTA, status: false };
    }

    if (
      stm32OTA &&
      stm32OTA !==
        (existDevice.stm32OTA && existDevice.stm32OTA.value.toString())
    ) {
      mongoSet["stm32OTA"] = { value: stm32OTA, status: false };
    }
    console.log(mongoSet);
    const updateDevice = await Device.findOneAndUpdate(
      { _id: deviceId },
      { ...mongoSet },
      { new: true }
    );

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "Device updated successfully",
          HttpStatus.OK,
          updateDevice
        )
      );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getDevice = async (req, res, next) => {
  try {
    const { deviceId } = req.params;

    const existDevice = await Device.findOne({ _id: deviceId });

    if (!existDevice)
      throw new HttpException("Device is not exists", HttpStatus.NOT_FOUND);

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "Device fetched Successfully.",
          HttpStatus.OK,
          existDevice
        )
      );
  } catch (err) {
    next(err);
  }
};

const getDevices = async (req, res, next) => {
  try {
    const devices = await Device.find();
    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler("Device fetched Successfully.", HttpStatus.OK, devices)
      );
  } catch (err) {
    next(err);
  }
};

const deleteDevice = async (req, res, next) => {
  try {
    const { deviceId } = req.params;

    const existDevice = await Device.findOne({ _id: deviceId });

    if (!existDevice)
      throw new HttpException("Device is not exists", HttpStatus.NOT_FOUND);

    await existDevice.remove();

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler("Device deleted Successfully.", HttpStatus.OK, null)
      );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDevice,
  updateWifiInfo,
  getDevice,
  getDevices,
  deleteDevice,
  updateOtaInfo,
};
