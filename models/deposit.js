const mongoose = require("mongoose");

const depositSchema = mongoose.Schema({
  amount: {
    type: decimal,
    default: 0,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Deposit", depositSchema);
