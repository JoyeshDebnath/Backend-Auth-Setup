const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verifyTokens"); //middleware for private Router
const { RegisterUser, loginUser } = require("../controllers/AuthController");
router.route("/register").post(RegisterUser);
router.route("/login").post(loginUser);

//private Rourtes .. restricting the yuser
router.get("/posts", verify, (req, res) => {
	res.status(200).json(req.user);
});

module.exports = router;
