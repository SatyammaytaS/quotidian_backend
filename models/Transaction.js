const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  amount: {
    type: mongoose.Decimal128,
    required: true,
    trim: true,
  },

  timestamps: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
