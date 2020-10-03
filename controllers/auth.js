const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

const User = require("../models/User");

//@desc     Register user
//@route    POST /api/auth/register
//@accesss  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, name, phonenumber, address, age } = req.body;
  //create user
  const user = await User.create({
    email,
    password,
    name,
    phonenumber,
    address,
    age,
  });

  //Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});

//@desc     Login user
//@route    POST /api/auth/login
//@accesss  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  //get token from model

  const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    res.status(statusCode).json({
      success: true,
      token,
    });
  };

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

//@desc     log user out
//@route    POST /api/auth/logout
//@accesss  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 100),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});
//@desc     Get current Logged in user
//@route    POST /api/auth/me
//@accesss  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
