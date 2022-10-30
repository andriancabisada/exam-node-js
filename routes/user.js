const express = require("express");
const router = express.Router();
const { createUser, getUser } = require("../controllers/user");

router.post("/", createUser);

router.get("/:id", getUser);

module.exports = router;
