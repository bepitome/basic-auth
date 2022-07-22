const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("./logger").intialize();
require("dotenv").config();
const logger = require("./logger").logger;
const path = require("path");
const jwt = require("jsonwebtoken");
const mongo_conn_native = require("./mongo_conn_native").Connection;

// Routes
const routeUserAPI = require("./restAPI/routes/route_user");
const routeAuthAPI = require("./restAPI/routes/route_auth");

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

app.use("/api/v1/users", (req, res, next) => {
    /**
     *  token validation middleware
     *
     *  if token is valid proceed with the request.
     *  otherwise @return unauthorized
     *
     */

    try {
        const token = req.headers.authorization;
        const [isValid, msg] = checkToken(token);
        if (isValid) {
            return next();
        }
        return res.status(200).send({ result: msg });
    } catch (error) {
        return res.status(200).send({ result: error });
    }
});

function checkToken(token) {
    if (token === undefined || token === "")
        return [false, "Unauthorized. Authorization header can't be empty."];
    if (token.toLowerCase().includes("basic")) {
        return [
            false,
            "Please pass a valid token, basic authentication is only allowed in login endpoint",
        ];
    }

    const data = jwt.verify(token, process.env.SECRET);
    if (data !== null || data !== "" || data != undefined) return [true, ""];
}

mongo_conn_native.connectToMongo().then(
    async() => {
        // Routes

        // testing APIs
        app.use("/api/v1/users", routeUserAPI);
        app.use("/api/v1/auth", routeAuthAPI);

        let port = process.env.PORT || 3016;
        app.listen(port, async() => {
            logger.info("Server is running");
            console.log("Node server is running.");
        });
    },
    (err) => {
        console.log("Unable to connect mongo");
        console.log(err);
        logger.error(err);
    }
);

exports.app = app;