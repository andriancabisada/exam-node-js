const express = require("express");
const { withDraw, getWithdraw } = require("../controllers/withdraw");
const router = express.Router();

router.post("/:id", withDraw);
router.get("/:id", getWithdraw);

module.exports = router;
