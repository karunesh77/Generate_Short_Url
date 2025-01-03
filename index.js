
const express = require("express");
const cookieParser = require('cookie-parser')

const urlRoute = require("./routes/url")
const path = require("path")
const { restrictToLoginUserOnly} = require("./middleware/auth")

const {connectMongoDB} = require("./connect/connect")
const staticRoute = require("./routes/staticRouter")
const url = require("./models/url")
const userRout = require("./routes/users")

const app = express();
    
const port = 8001


app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.json())


app.use("/url",restrictToLoginUserOnly, urlRoute);

app.use("/", staticRoute)

app.use("/users", userRout)




connectMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("mongoDB Successfully connected"));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


// app.get("/test", async (req, res) =>{
//     const allUsers = await url.findById({})
//      return res.end(`<html>
//                 <head></head>       
//                 <body>
                
//                 <h2>SSR</h2>
//                 <ol>
//               ${allUsers.map(url => `<li>${url.shortId}- ${url.redirect}/ ${url.visitHistory}</li>`).join("")}
//                 </ol>

//                 </body>
        
//         </html>`)
// })


     

app.get("/url/:shortId", async (req, res) => {
    shortId = req.params.shortId
    const entry = await url.findOneAndUpdate({
        shortId,
    },
    {
        $push:{
            visitHistory:{
                timestamp:Date.now(), 
            }
        }
    }
)
      console.log(entry);
      res.redirect(entry.originalUrl)
      
        

})

// app.delete("/:id", async (req, res ) =>{
//        await url.findByIdAndDelete(req.params.id)
//        return res.json({msg:"success"})

// })

app.listen(port,() => {
    console.log(`server started at port:${port}`);
    
})