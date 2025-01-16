const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv");
env.config(); 
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cloudinary = require("./controller/cloudnarySetup");
const {mailRouter} = require("./routes/mail");
const {authRouter} = require("./routes/auth");

mongoose.connect(process.env.MONGODB_URL).then(()=> {console.log("Conected to db..")});;

app.use(cors({
    origin : 'http://localhost:5173',
    methods : ['GET', 'POST', 'DELETE','PUT'],
    credentials : true,

}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/mail", mailRouter);
app.use("/api/auth", authRouter);


app.get("/",(req,res)=>{
    console.log("Server is working");
    res.json({
        msg:"Working fine!"
    })
})

app.listen(process.env.PORT, ()=>{console.log("App is listening..")});