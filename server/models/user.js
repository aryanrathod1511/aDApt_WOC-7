const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    role: {
        type:String,
        enum :['student', 'admin'],
        required:true,
    },
    
});

const User = new mongoose.model("User", userSchema);
module.exports = {userModel : User};