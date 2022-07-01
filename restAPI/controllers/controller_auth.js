const express = require("express");
/* eslint-disable-next-line */
const router = express.Router();
/* eslint-disable-next-line */
const logger = require("../../logger").logger;
const { DATABASE, COLLECTION } = require("../../public/constant");

const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens

/**
 * @async
 * @route   GET /api/v1/auth/testAPI
 * @returns {object} test API
 * @author
 * @access  public
 * @version 1.0
 */

exports.testAPI = async (req, res, next) => {
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
 * @route       Post /api/v1/auth/:id
 * @returns     {Users} user object
 * @author
 * @access      public
 * @version     1.0
 */

exports.login = async (req, res, next) => {
  const client = mongo_conn_native.client;
  const { userName ,password} = req.body;
  try {
    let data = await client
      .db(DATABASE.NAME)
      .collection(COLLECTION.USERS)
      .findOne({ username: userName });

    if (data === null)
      return res.status(200).send({ result: "User not registered." });
    const result = await bcrypt.compare(password, data.password);
    if (result)
      return res.status(401).send({ result: "Password is not correct" });
    const token = await jwt.sign({ data: data }, process.env.SECRET);
    return res.status(200).send({ result: token });
  } catch (error) {
    return res.status(401).send({ result: error.toString() });
  }
};