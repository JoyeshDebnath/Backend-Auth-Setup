const User = require("../models/users");
const { loginValidation, RegisterValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//regeister user ...

const RegisterUser = async (req, res) => {
	// res.send(error.details[0].message);
	const validation = RegisterValidation(req.body);
	const { error } = validation;
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	//check if the user email already exists///
	const EmailExists = await User.findOne({ email: req.body.email });
	if (EmailExists) {
		return res.status(400).send("Email already exists!!");
	}

	//hash passwords ...

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	console.log(hashPassword);
	//create a user and enter data in database
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});

	try {
		const savedUser = await user.save();
		res.status(200).json({ savedUser });
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

//User Login ..
const loginUser = async (req, res) => {
	//check for erreor
	const { error } = loginValidation(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	}
	//check if the Email entered exists in database already ...
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res
			.status(400)
			.send("Email OR password  you entered does not exists !!!");
	}

	//check the password is valid or not ...
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) {
		res.status(400).send("Email Or password is invalid!");
	}

	// create and asign a token ....
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header("auth-token", token).send(token);
};

module.exports = { RegisterUser, loginUser };
