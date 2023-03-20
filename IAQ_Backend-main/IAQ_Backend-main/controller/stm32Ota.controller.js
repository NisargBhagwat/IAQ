const User = require("../model/user.model");
const HttpException = require("../utils/HttpException");
const HttpStatus = require("../utils/HttpStatus");
const responseHandler = require("../utils/responseHandler");
const Stm32Ota = require("../model/stm32Ota.model");

const createStm32Ota = async (req, res, next) => {
  try {
    const { otaVersion } = req.body;

    const foundWifiOta = await Stm32Ota.findOne({
      otaVersion,
      isDeleted: false,
    });

    if (foundWifiOta)
      throw new HttpException(
        "OTA version already exists!",
        HttpStatus.CONFLICT
      );

    const newStm32Ota = await Stm32Ota.create({ ...req.body });

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "Stm32 Ota created successfully",
          HttpStatus.OK,
          newStm32Ota
        )
      );
  } catch (err) {
    next(err);
  }
};

const getAllStm32Ota = async (req, res, next) => {
  try {
    const stm32Ota = await Stm32Ota.find({ isDeleted: false });

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "stm32 ota fetched successfully",
          HttpStatus.OK,
          stm32Ota
        )
      );
  } catch (err) {
    next(err);
  }
};

const deleteStm32Ota = async (req, res, next) => {
  try {
    const { stm32OtaId } = req.params;
    const stm32Ota = await Stm32Ota.findOneAndUpdate(
      { _id: stm32OtaId },
      { isDeleted: true },
      { new: true }
    );

    if (!stm32Ota) {
      throw new HttpException("Wi-fi Ota not found!", HttpStatus.NOT_FOUND);
    }

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "stm32 Ota deleted successfully",
          HttpStatus.OK,
          stm32Ota
        )
      );
  } catch (err) {
    next(err);
  }
};

const updateStm32Ota = async (req, res, next) => {
  try {
    const { otaVersion } = req.body;
    const { stm32OtaId } = req.params;

    const foundWifiOta = await Stm32Ota.findOne({
      _id: {$ne: stm32OtaId},
      otaVersion,
      isDeleted: false,
    });

    if (foundWifiOta)
      throw new HttpException(
        "OTA version already exists!",
        HttpStatus.CONFLICT
      );

    const stm32Ota = await Stm32Ota.findOneAndUpdate(
      { _id: stm32OtaId },
      { ...req.body },
      { new: true }
    );

    if (!stm32Ota) {
      throw new HttpException("Wi-fi Ota not found!", HttpStatus.NOT_FOUND);
    }

    return res
      .status(HttpStatus.OK)
      .json(
        responseHandler(
          "Stm32 Ota updated successfully",
          HttpStatus.OK,
          stm32Ota
        )
      );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStm32Ota,
  getAllStm32Ota,
  deleteStm32Ota,
  updateStm32Ota,
};
