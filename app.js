const express = require("express");
require("dotenv").config();
const AuthRouter = require("./routes/auth");
const ConnectDB = require("./db/connect");
const app = express(); //initialize the app()

//middleware
app.use(express.json());

//middlewares
//env variables
const PORT = process.env.PORT;
var connectionString = process.env.MONGO_URI;
//env variables

//routes
app.use("/api/v1/", AuthRouter);

//routes
//connect to db and then start the server if connection Successful
const start = async () => {
	try {
		await ConnectDB(connectionString);
		console.log("Db connected Successfully");

		//start the server
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: `Something Went Wrong!!` });
	}
};

start();
