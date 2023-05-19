const express = require("express");
const {
  verifyEmail,
  verifybyOtp,
} = require("../../controllers/auth/verifyEmail");
const router = express.Router();

router.post("/verifyemail", verifyEmail);
router.post("/verify", verifybyOtp);

module.exports = router;
