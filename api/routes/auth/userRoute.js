const express = require("express");
const {
  userRegistration,
  userLogin,
  userLogout,
} = require("../../controllers/auth/registerUserCrtl");
const {
  verifyUserToken,
  verifyTokenandAdmin,
} = require("../../controllers/auth/protectedRoute");

const router = express.Router();

//user regsitration
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/pro", verifyTokenandAdmin, (req, res) => {
  return res.status(200).json("Hello procted");
});

module.exports = router;
