const express = require("express");
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
 * @route       GET /api/v1/user/users
 * @returns     {Users} All users
 * @author      Bawad
 * @access      public
 * @version     1.0
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
        return res.status(401).send({ result: error.toString() });
    }
};

/**
 * @async
 * @route       GET /api/v1/user/:id
 * @returns     {Users} user object
 * @author      Bawad
 * @access      public
 * @version     1.0
 */

// eslint-disable-next-line
exports.userAPI = async(req, res, next) => {
    const client = mongo_conn_native.client;
    const { id } = req.params;
    try {
        let data = await client
            .db(DATABASE.NAME)
            .collection(COLLECTION.USERS)
            .findOne({ user_id: parseInt(id) });

        if (data === null)
            return res.status(200).send({ result: "User not registered." });
        res.status(200).send({ result: data });
    } catch (error) {
        return res.status(401).send({ result: error.toString() });
    }
};

/**
 * @async
 * @route       POST /api/v1/user/remove
 * @returns     {String} user object
 * @author      Bawad
 * @access      public
 * @version     1.0
 * @status      sensitive
 */

// eslint-disable-next-line
exports.removeUserAPI = async(req, res, next) => {
    const client = mongo_conn_native.client;
    const username = req.body.username;

    try {
        let data = await client
            .db(DATABASE.NAME)
            .collection(COLLECTION.USERS)
            .deleteOne({ username: username });

        if (data != null && data.deletedCount === 1)
            return res
                .status(200)
                .send({ result: "Account has been deleted successfuly." });
        if (data != null && data.deletedCount === 0)
            return res.status(200).send({ result: "Account is not exist." });
    } catch (error) {
        return res.status(401).send({ result: error.toString() });
    }
};