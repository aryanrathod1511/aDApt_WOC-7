const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    emails: [emailSchema],
});

const Category = new mongoose.model("Category", categorySchema);
module.exports = {categoryModel : Category};