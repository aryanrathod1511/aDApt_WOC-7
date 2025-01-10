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

const materialSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description :{
        type:String,
    },
    fileUrl : {
        type:String,
    },
    uploadedAt : {
        type: Date,
        required:true,
    },
    uploadedBy : {
        type:ObjectId,
        required:true,
    },

});

const emailSchema = new Schema({
    emailId: {
        type: String,
        required: true,
        unique: true, 
    },
    hostName: String,
    categoryId : ObjectId,
});

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    emails: [emailSchema],
});

const User = new mongoose.model("User", userSchema);
const Material = new mongoose.model("Material", materialSchema);
const Category = mongoose.model('Category', categorySchema);
const Email = mongoose.model("Email", emailSchema); 

module.exports = {
    userModel : User,
    materialModel : Material,
    emailModel : Email,
    categoryModel : Category,
}