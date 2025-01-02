const express = require("express");
const router = express.Router();
const User = require("../models/users");
const {handleUserSignup} = require("../controllers/users")
const {handleUserLogin} = require("../controllers/users")


router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);


module.exports = router;