require("dotenv").config();

const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGO_URI;
const connectDB = async () => {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("database is connected"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
