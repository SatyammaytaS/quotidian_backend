const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Transaction = require("../models/Transaction");

//@desc../models/transactionet all transactions
//Method    GET /api/transaction
exports.getTransactions = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.find();
  if (!transaction) {
    return next(new ErrorResponse("No data", 404));
  }
  res.status(200).json({
    success: true,
    data: transaction,
  });
});

//@desc     Get one transaction
//Method    GET /api/transaction/:id
exports.getTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return next(new ErrorResponse(`user with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: transaction,
  });
});
//@desc     create a transaction
//Method    POST /api/transaction
exports.createTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.create(req.body);
  res.status(200).json({
    success: true,
    data: transaction,
  });
});

//@desc     update one transaction
//Method    PUT /api/transaction/:id
exports.updateTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!transaction) {
    return next(new ErrorResponse(`user with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: transaction,
  });
});

//@desc     delete one transaction
//Method    DELETE /api/transaction/:id
exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);
  if (!transaction) {
    return next(new ErrorResponse(`user with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});
