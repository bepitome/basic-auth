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

exports.userAPI = async(req, res, next) => {
    const client = mongo_conn_native.client;
    const { id } = req.params;
    try {
        let data = await client
            .db(DATABASE.NAME)
            .collection(COLLECTION.USERS)
            .findOne({ id: parseInt(id) });

        if (data === null)
            return res.status(200).send({ result: "User not registered." });
        res.status(200).send({ result: data });
    } catch (error) {
        return res.status(401).send({ result: error.toString() });
    }
};

/**
 * @async
 * @route       DELETE /api/v1/user/remove
 * @returns     {String} user object
 * @author      Bawad
 * @access      public
 * @version     1.0
 * @status      sensitive
 */

exports.removeUserAPI = async(req, res, next) => {
    const client = mongo_conn_native.client;
    const username = req.body.username;

    try {
        let data = await client
            .db(DATABASE.NAME)
            .collection(COLLECTION.USERS)
            .deleteOne({ username: username });

        if (data != null && data.deletedCount === 1)
            return res.status(200).send({
                result: "Account has been deleted successfuly.",
                status: 1,
            });
        if (data != null && data.deletedCount === 0)
            return res.status(200).send({
                result: "Account is not exist.",
                status: 0,
            });
    } catch (error) {
        return res.status(401).send({ result: error.toString() });
    }
};

/**
 * @async
 * @route       PUT /api/v1/user/reset
 * @returns     {String} success message
 * @author      Bawad
 * @access      public
 * @version     1.0
 * @status      sensitive
 */

exports.resetUserAPI = async(req, res, next) => {
    const client = mongo_conn_native.client;

    try {
        const filter = { username: req.body.username };
        // options is used to add a new document in case nothing match
        // const options = { upsert: true };
        const replacementDocument = {
            $set: { password: req.body.npassword },
        };

        let data = await client
            .db(DATABASE.NAME)
            .collection(COLLECTION.USERS)
            .updateOne(filter, replacementDocument);

        console.log("data -------- ", data);

        if (
            data.acknowledged === true &&
            data.matchedCount === 1 &&
            data.modifiedCount === 0
        ) {
            return res.status(200).send({
                message: "Your new password can't be similar to the current password",
                status: 0,
            });
        }
        if (data.acknowledged === true && data.modifiedCount > 0) {
            return res.status(200).send({
                message: "Password has been updated successfuly.",
                status: 1,
            });
        }
        if (data != null && data.modifiedCount === 0)
            return res.status(200).send({
                result: "Account is not exist.",
                status: 0,
            });
    } catch (error) {
        return res.status(401).send({ result: error.toString() });
    }
};