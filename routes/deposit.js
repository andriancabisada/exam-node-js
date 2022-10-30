const express = require("express");
const router = express.Router();
const { deposit, getDeposit } = require("../controllers/deposit");

router.post("/:id", deposit);
router.post("/:id", getDeposit);

module.exports = router;
