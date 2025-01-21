const mongoose = require("mongoose");
const { buffer } = require("stream/consumers");
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const queSchema = new Schema({
    text: {
      type: String,
      required: true,
    },
    categoryId: { 
        type: ObjectId, 
        required: true
    },
    image: {
      data: Buffer,         
      contentType: String,  // Store the MIME type (e.g., "image/png", "image/jpeg")
    },

});

const Que = new mongoose.model("Que", queSchema);
module.exports = {queModel : Que};