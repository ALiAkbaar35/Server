const express = require("express");
const router = express.Router();
const { signup } = require("../Controllers/signupController");
router.post("/", signup);
module.exports = router;
