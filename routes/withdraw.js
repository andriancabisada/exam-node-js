const express = require("express");
const { withDraw, getWithdraw } = require("../controllers/withdraw");
const router = express.Router();

router.post("/", withDraw);

module.exports = router;
