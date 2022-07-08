const express = require("express");
const router = express.Router();

// Controller
const controller_appraisal_modules = require("../controllers/controller_user");

// isAdmin validation
router.use("/remove", (req, res, next) => {
	/**
     *  user type validation should be from database
     *
     *  needs to call userAPI to get user details, then validate it's type,
     *  in case it's an admin proceed with the request.
     *
     *  otherwise @return unauthorized
     *
     */
	next();
});

router.get("/test", controller_appraisal_modules.testAPI);

router.get("/", controller_appraisal_modules.usersAPI);

router.get("/:id", controller_appraisal_modules.userAPI);

router.delete("/remove", controller_appraisal_modules.removeUserAPI);

router.put("/reset", controller_appraisal_modules.resetUserAPI);

module.exports = router;