const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_auth");

router.get("/test", controller_appraisal_modules.testAPI);
router.post("/:userName", controller_appraisal_modules.login);
module.exports = router;