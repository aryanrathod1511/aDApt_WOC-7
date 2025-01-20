const mongoose = require("mongoose");
const { buffer } = require("stream/consumers");
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const queSchema = new Schema({
    text : {
        type : String,
        required : true,   
    },
    image :{
        type : String,
        default : process.env.DEFAULT_IMAGE,
    },

});

const Que = new mongoose.model("Que", queSchema);
module.exports = {queModel : Que};