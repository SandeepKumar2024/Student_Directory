const express = require("express");
const { verifyUserToken } = require("../../controllers/auth/protectedRoute");
const { getStudent } = require("../../controllers/filterUser/userFilterContr");
const router = express.Router();

router.get("/", getStudent);

module.exports = router;
