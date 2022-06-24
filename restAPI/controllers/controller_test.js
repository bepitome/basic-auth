const express = require("express");
/* eslint-disable-next-line */
const router = express.Router();
/* eslint-disable-next-line */
const logger = require("../../logger").logger;
const { DATABASE, COLLECTION } = require("../../public/constant");

/**
 * @async
 * @route   POST /api/testAPI
 * @returns {object} test API
 * @author  {name}
 * @access  public
 * @version 1.0
 */

// eslint-disable-next-line
exports.testAPI = async(req, res, next) => {
    res.status(200).send({
        error: false,
        code: 200,
        status: "succsess",
        message: "Test API Works",
    });
};

// DB connection testing
const mongo_conn_native = require("../../mongo_conn_native").Connection;

/**
 * @async
 * @route   POST /api/testAPI
 * @returns {object} test API
 * @author  {name}
 * @access  public
 * @version 1.0
 */

// eslint-disable-next-line
exports.testDB = async(req, res, next) => {
    const client = mongo_conn_native.client;
    console.log(COLLECTION.ACCOUNTS);
    console.log(DATABASE.NAME);
    try {
        await client.db(DATABASE.NAME).collection(COLLECTION.ACCOUNTS).insertOne({
            test: "test",
        });
        res.send({
            error: false,
            code: 200,
            status: "succsess",
            message: "DB API Works",
        });
    } catch (e) {
        return res.send({
            error: true,
            code: 401,
            status: "failed",
            message: e,
        });
    }
};