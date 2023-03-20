const { hash } = require("bcrypt");
const User = require("../model/user.model");
const HttpException = require("../utils/HttpException");
const HttpStatus = require("../utils/HttpStatus");
const { has, compare } = require("bcrypt");
const responseHandler = require("../utils/responseHandler");
const { sign } = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser)
      throw new HttpException("User not exists!", HttpStatus.NOT_FOUND);

    const isEqual = await compare(password, foundUser.password);

    if (!isEqual)
      throw new HttpException("Wrong password", HttpStatus.UNAUTHORIZED);

    const jwtToken = sign(
      { userId: foundUser._id.toString() },
      process.env.JWT,
      {}
    );

    const responseData = {
      userId: foundUser._id,
      email: foundUser.email,
      name: foundUser.fullName,
      jwtToken
    }

    return res
        .status(HttpStatus.OK)
        .json(responseHandler("Login Successfully.", HttpStatus.OK, responseData));
  } catch (err) {
    next(err);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
      throw new HttpException("Email-Id already exists!", HttpStatus.CONFLICT);
    }

    const hasPassword = await hash(password, 12);

    const newUser = await User.create({
      fullName: name,
      email,
      password: hasPassword,
    });

    return res
      .status(HttpStatus.OK)
      .json(responseHandler("User created successfully", HttpStatus.OK, null));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  signUp,
};
