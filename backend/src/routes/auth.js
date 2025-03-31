const express = require("express");
const router = express.Router();
const { signUp, signIn, confirmSignUp } = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/verify", confirmSignUp);

module.exports = router;
