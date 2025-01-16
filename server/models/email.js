const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const emailSchema = new Schema({
    emailId: {
        type: String,
        required: true,
        unique: true, 
    },
    hostName: String,
    categoryId : ObjectId,
});

const Email = new mongoose.model("Email", emailSchema);
module.exports = {emailModel : Email};