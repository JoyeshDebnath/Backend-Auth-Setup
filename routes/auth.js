const express = require("express");
const router = express.Router();
const { RegisterUser } = require("../controllers/AuthController");
router.route("/register").post(RegisterUser);

module.exports = router;
