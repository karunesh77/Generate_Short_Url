


const express = require("express")
const router = express.Router()
const url = require("../models/url")


router.get("/", async (req, res) =>{
    const allurls = await url.find({})
    return res.render("home",{
        urls:allurls
    })
})





module.exports = router