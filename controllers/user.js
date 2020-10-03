const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//@desc     Get all users
//Method     GET /api/users
module.exports.getUsers = asyncHandler(async (req, res, next) => {
  const data = await User.find();

  res.status(200).json({
    success: true,
    count: data.length,
    data: data,
    msg: "show all users",
  });
});

//@desc     Get a user
//Method    GET /api/users/:id
module.exports.getUser = asyncHandler(async (req, res, next) => {
  const data = await User.findById(req.params.id);
  if (!data) {
    return next(
      new ErrorResponse(`user with id of ${req.params.id} not found!`, 404)
    );
  }
  res
    .status(200)
    .json({ success: true, data: data, msg: `show user ${req.params.id}` });
});

//@desc     Create a user
//Method     POST /api/users
module.exports.createUser = asyncHandler(async (req, res, next) => {
  const data = await User.create(req.body);

  res.status(201).json({ success: true, data: data, msg: "user created" });
});

//@desc     Update a user
//Method   PUT /api/users/:id
module.exports.updateUser = asyncHandler(async (req, res, next) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) {
    return next(
      new ErrorResponse(`user with id of ${req.params.id} not found!`, 404)
    );
  }
  res.status(201).json({
    success: true,
    data: data,
    smsg: `update user ${req.params.id}`,
  });
});

//@desc     Delete a user
//Method    DELETE /api/users/:id
module.exports.deleteUser = asyncHandler(async (req, res, next) => {
  const data = await User.findByIdAndRemove(req.params.id);
  if (!data) {
    return next(
      new ErrorResponse(`user with id of ${req.params.id} not found!`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {},
    msg: `user with id:${req.params.id} deleted!`,
  });
});
