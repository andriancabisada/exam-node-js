const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
