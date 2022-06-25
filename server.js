const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("./logger").intialize();
require("dotenv").config();
const logger = require("./logger").logger;
const path = require("path");
const mongo_conn_native = require("./mongo_conn_native").Connection;

// Routes
const routeUserAPI = require("./restAPI/routes/route_user");

// Initialzie Express
const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", "restAPI/views");
// Morgan
app.use(morgan("dev"));

//static
app.use(express.static(path.join(__dirname, "public")));

// Response Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

// parse application/json
app.use(bodyParser.json({ limit: "500mb", extended: true }));

// For CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

mongo_conn_native.connectToMongo().then(
	async() => {
		// Routes

		// testing APIs
		app.use("/api/v1/users", routeUserAPI);

		let port = process.env.PORT || 3016;
		app.listen(port, async() => {
			logger.info(`Test Node is listening on port ${port}`);
			console.log(`Test Node is listening on port ${port}`);
		});
	},
	(err) => {
		console.log("Unable to connect mongo");
		console.log(err);
		logger.error(err);
	}
);

exports.app = app;