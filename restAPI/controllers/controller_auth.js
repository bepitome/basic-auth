const express = require("express");
/* eslint-disable-next-line */
const router = express.Router();
/* eslint-disable-next-line */
const logger = require("../../logger").logger;
const { DATABASE, COLLECTION } = require("../../public/constant");
const jwt = require("jsonwebtoken"); // import jwt to sign tokens

/**
 * @async
 * @route   GET /api/v1/auth/testAPI
 * @returns {object} test API
 * @author  Hassan Ali
 * @access  public
 * @version 1.0
 */

exports.testAPI = async(req, res) => {
	res.status(200).send({
		error: false,
		code: 200,
		status: "succsess",
		message: "Test API Works",
	});
};

// DB connection
const mongo_conn_native = require("../../mongo_conn_native").Connection;

/**
 * @async
 * @route       Post /api/v1/auth/login
 * @returns     {JWT token}
 * @author      Hassan Ali
 * @coauthor    Bassam
 * @access      public
 * @version     1.0
 */

exports.login = async(req, res) => {
	const client = mongo_conn_native.client;
	const authorization = req.headers.authorization;

	const [isValid, msg] = checkAuth(authorization);
	if (!isValid) return res.status(200).send({ result: msg });





	try {
		// remove Basic word
		var [basic, auth] = authorization.split(" ");
		if (basic.toLowerCase() !== "basic") {
			return res
				.status(200)
				.send({ result: "You should add `Basic` before the decoded value" });
		}
		try {
			// decode auth header
			var buf = Buffer.from(auth, "base64");
		} catch (error) {
			return res
				.status(200)
				.send({ result: "Authorization header value is invalid" });
		}

		// desctruct username and password
		const [_username, _password] = buf
			.toString()
			.split(":")
			.map((i) => i.trim());

		let data = await client
			.db(DATABASE.NAME)
			.collection(COLLECTION.USERS)
			.findOne({ username: _username });

		if (data === null)
			return res.status(200).send({ result: "User not registered." });
		if (_password !== data.password)
			return res.status(401).send({ result: "Password is not correct" });

		// process.env.SECRET the key which used to encode/generate the token
		//                    for decoding you should use jwt.verify() method
		//                    and pass the same SECRET.
		const token = jwt.sign({ data: data }, process.env.SECRET);
		return res.status(200).send({ result: { accessToken: token, id: data.id }});
	} catch (error) {
		return res.status(401).send({ result: error.toString() });
	}
};

/**
 * @route       Helper function for /api/v1/auth/login
 * @returns     {Boolean, String}
 * @author      Bassam
 * @access      private
 * @version     1.0
 */

function checkAuth(authorization) {
	if (authorization === undefined)
		return [false, "Request does not have Authorization header"];
	if (authorization === "")
		return [false, "Authorization header can't be empty"];
	return [true, "Success"];
}
