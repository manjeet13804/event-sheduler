const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require("mongoose")
const Routes =require("./Routes/routes.js")
mongoose.connect("mongodb://127.0.0.1:27017/events")
    .then(console.log("Connected to database"))
    .catch(console.error)
 app.use("/v1/events",Routes)  
app.get("/", (req, res) => {
    res.json({
        massage: "ok"
    })
})

app.listen(3000, () => console.log("server is up at 3000 port"))