const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const {queSchema} = require("./que");

const queCategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    questions:ObjectId,
});

const Quecategory = new mongoose.model("Quecategory", queCategorySchema);
module.exports = {queCategoryModel : Quecategory};