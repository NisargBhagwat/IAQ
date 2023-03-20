const User = require("../model/user.model");
const HttpException = require("../utils/HttpException");
const HttpStatus = require("../utils/HttpStatus");
const responseHandler = require("../utils/responseHandler");
const WifiOta = require("../model/wifiOta.model");

const createWifiOta = async (req, res, next) => {
  try {
    const { otaVersion } = req.body;

    const foundWifiOta = await WifiOta.findOne({
      otaVersion,
      isDeleted: false,
    });

    if (foundWifiOta)
      throw new HttpException(
        "OTA version already exists!",
        HttpStatus.CONFLICT
      );

    const newWifiOta = await WifiOta.create({ ...req.body });

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "Wi-fi ota created successfully",
          HttpStatus.OK,
          newWifiOta
        )
      );
  } catch (err) {
    next(err);
  }
};

const getAllWifiOta = async (req, res, next) => {
  try {
    const wifiOta = await WifiOta.find({ isDeleted: false });

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "Wi-fi ota fetched successfully",
          HttpStatus.OK,
          wifiOta
        )
      );
  } catch (err) {
    next(err);
  }
};

const deleteWifiOta = async (req, res, next) => {
  try {
    const { wifiOtaId } = req.params;
    const wifiOta = await WifiOta.findOneAndUpdate(
      { _id: wifiOtaId },
      { isDeleted: true },
      { new: true }
    );

    if (!wifiOta) {
      throw new HttpException("Wi-fi Ota not found!", HttpStatus.NOT_FOUND);
    }

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "Wi-fi ota deleted successfully",
          HttpStatus.OK,
          wifiOta
        )
      );
  } catch (err) {
    next(err);
  }
};

const updateWifiOta = async (req, res, next) => {
  try {
    const { otaVersion } = req.body;
    const { wifiOtaId } = req.params;

    const foundWifiOta = await WifiOta.findOne({
      _id: {$ne: wifiOtaId},
      otaVersion,
      isDeleted: false,
    });

    if (foundWifiOta)
      throw new HttpException(
        "OTA version already exists!",
        HttpStatus.CONFLICT
      );

    const wifiOta = await WifiOta.findOneAndUpdate(
      { _id: wifiOtaId },
      { ...req.body },
      { new: true }
    );

    if (!wifiOta) {
      throw new HttpException("Wi-fi Ota not found!", HttpStatus.NOT_FOUND);
    }

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "Wi-fi ota updated successfully",
          HttpStatus.OK,
          wifiOta
        )
      );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createWifiOta,
  getAllWifiOta,
  deleteWifiOta,
  updateWifiOta,
};
