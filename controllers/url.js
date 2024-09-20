
const shortID = require('shortid');
const url = require("../models/url")

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required"})
    const shortId = shortID(8);

    await url.create({
        shortId : shortId,
        originalUrl : body.url,
        visitHistory:[],
    
    })

    return res.render("home", {
        id:shortId
    })


}

module.exports = {
    handleGenerateNewShortURL,

}