const express = require("express");
const { cli } = require("winston/lib/winston/config");
/* eslint-disable-next-line */
const router = express.Router();
/* eslint-disable-next-line */
const logger = require("../../logger").logger;
const { DATABASE, COLLECTION } = require("../../public/constant");

/**
 * @async
 * @route   GET /api/v1/user/testAPI
 * @returns {object} test API
 * @author  {Bawad}
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

// DB connection
const mongo_conn_native = require("../../mongo_conn_native").Connection;

/**
 * @async
 * @route   GET /api/v1/user/users
 * @returns {Users} All users
 * @author  {Bawad}
 * @access  public
 * @version 1.0
 */

// eslint-disable-next-line
exports.usersAPI = async(req, res, next) => {
    const client = mongo_conn_native.client;

    try {
        let data = await client
            .db(DATABASE.NAME)
            .collection(COLLECTION.USERS)
            .find()
            .toArray();

        res.status(200).send({ result: data });
    } catch (error) {
        // test database connection
        const status = await client.db("admin").command({ ping: 1 });
        if (status.ok != 1) {
            res.status(501).send({ error: "database is not connected" });
        } else {
            res.status(401).send({ error: error });
        }
    }
};