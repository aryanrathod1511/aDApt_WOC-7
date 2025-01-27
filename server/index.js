const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
env.config(); 
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cloudinary = require("./config/cloudnarySetup");
const multer = require("multer");
const {mailRouter} = require("./routes/mail");
const {authRouter} = require("./routes/auth");
const {authenticateUser} = require("./middlewares/auth");
const {qnaRouter} = require("./routes/qna");
const {server} = require("./config/socketConfig");

mongoose.connect(process.env.MONGODB_URL).then(()=> {console.log("Conected to db..")});;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors({
    origin : 'http://localhost:5173',
    methods : ['GET', 'POST', 'DELETE','PUT'],
    credentials : true,

}));

app.get("/api/auth/check", authenticateUser);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/mail", mailRouter);
app.use("/api/auth", authRouter);
app.use("/api/qna/categories", qnaRouter);


app.listen(process.env.PORT, ()=>{console.log("App is listening..")});