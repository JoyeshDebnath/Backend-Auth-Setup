const User = require("../models/users");
const { loginValidation, RegisterValidation } = require("../validation");
const bcrypt = require("bcryptjs");
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

module.exports = { RegisterUser };
