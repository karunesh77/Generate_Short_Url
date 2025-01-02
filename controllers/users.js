const User = require("../models/users");
const { v4: uuidv4 } = require("uuid")
const { setUser, getUser} = require("../service/auth")


async function handleUserSignup(req, res) {
    const {name,email,password}  = req.body;

    const user = await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/")
    }


async function handleUserLogin(req, res) {
    const {email,password}  = req.body;

    const user = await User.findOne({email,password})
    if(!user) return res.render("login",{
        error:"Invalid Username or Password"
    })

    const sessioId = uuidv4();

    setUser(sessioId,user)

    res.cookie("uid",sessioId);

    return res.redirect("/")
    }


    module.exports = {
        handleUserSignup,
        handleUserLogin
    }