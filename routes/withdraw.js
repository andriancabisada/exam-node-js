const express = require("express");
const { withDraw } = require("../controllers/withdraw");
const router = express.Router();

router.post("/:id", withDraw);

module.exports = router;
