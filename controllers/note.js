const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Note = require("../models/Note");

//@desc../models/getet all Notes
//Method    GET /api/note
exports.getNotes = asyncHandler(async (req, res, next) => {
  const note = await Note.find();
  if (!note) {
    return next(new ErrorResponse("No data", 404));
  }
  res.status(200).json({
    success: true,
    data: note,
  });
});

//@desc     Get one Note
//Method    GET /api/note/:id
exports.getNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    return next(new ErrorResponse(`user with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: note,
  });
});
//@desc     create a Note
//Method    POST /api/note
exports.createNote = asyncHandler(async (req, res, next) => {
  const note = await Note.create(req.body);
  res.status(200).json({
    success: true,
    data: note,
  });
});

//@desc     update one Note
//Method    PUT /api/note/:id
exports.updateNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!note) {
    return next(new ErrorResponse(`user with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: note,
  });
});

//@desc     delete one Note
//Method    DELETE /api/note/:id
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) {
    return next(new ErrorResponse(`user with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
