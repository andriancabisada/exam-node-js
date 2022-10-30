const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  accountBalance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
