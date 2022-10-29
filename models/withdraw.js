const mongoose = require("mongoose");

const withdrawSchema = mongoose.Schema({
  amount: {
    type: decimal,
    default: 0,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
