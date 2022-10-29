const express = require("express");
const router = express.Router();
const { deposit } = require("../controllers/deposit");

router.post("/:id", deposit);

module.exports = router;
