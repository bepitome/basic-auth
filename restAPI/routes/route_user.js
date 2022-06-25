const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_user");

router.get("/test", controller_appraisal_modules.testAPI);

router.get("/", controller_appraisal_modules.usersAPI);

module.exports = router;