const express = require("express");
const jwtToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const {adminSignup, adminLogin, login, signup} = require("../controller/authentication");

router.post("/adminsignup",adminSignup);
router.post("/adminlogin", adminLogin);
router.post("/login", login);
router.post("/signup", signup);

module.exports = {
    authRouter : router
}
