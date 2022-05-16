const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		max: 255,
		min: 6,
	},
	password: {
		type: String,
		required: true,
		min: 7,
		max: 5000,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("users", usersSchema);
