const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

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

const Material = new mongoose.model("Material", materialSchema);
module.exports = {materialModel : Material}