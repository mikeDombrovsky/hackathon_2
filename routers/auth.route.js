const express = require("express");
const router = express.Router();

const fs = require("fs");
const { register, login } = require("../controllers/auth.controller.js");

router.post("/register", register);

router.post("/login", login);

module.exports = router;
