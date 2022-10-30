const express = require("express");
const router = express.Router();
const { createUser, getUserById, getUsers } = require("../controllers/user");

router.post("/", createUser);
router.get("/:id", getUserById);
router.get("/", getUsers);

module.exports = router;
