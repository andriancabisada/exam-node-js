const express = require("express");

const { deposit } = require("../controllers/deposit");

const router = express.Router();

router.post("/", deposit);

module.exports = router;
