const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  accountBalance: {
    type: decimal,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
