const express = require("express");
const verifyEmail = require("../../controllers/auth/verifyEmail");
const router = express.Router();

router.post("/verifyemail", verifyEmail);

module.exports = router;
