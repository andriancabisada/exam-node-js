const express = require("express");
const router = express.Router();
const { deposit, getDeposits } = require("../controllers/deposit");

router.post("/", deposit);
router.get("/", getDeposits);

module.exports = router;
