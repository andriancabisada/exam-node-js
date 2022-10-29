const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./database/config");
const depositRoutes = require("./routes/deposit");
const withDrawRoutes = require("./routes/withdraw");
const userRoutes = require("./routes/user");
const app = express();

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//middleware
app.use(express.json());
app.use("/deposit", depositRoutes);
app.use("/user", userRoutes);
app.use("/withdraw", withDrawRoutes);
app.get("/", (req, res) => {
  res.send("Hello Homepage");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
