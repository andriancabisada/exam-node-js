const express = require("express");

const { withDraw } = require("../controllers/withdraw");

const router = express.Router();

router.post("/", withDraw);

module.exports = router;
