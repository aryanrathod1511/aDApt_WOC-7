const express = require("express");
const {queCategoryModel} = require("../models/queCategory");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");
const router = express.Router();
const {fetchCategory, addCategory, removeCategory} = require("../controller/queCategory");


//fetch all categories
router.get("/", fetchCategory);

//add a category
router.post("/add", addCategory);

//delete a category
router.delete("/:category/remove", removeCategory);

module.exports = {
    qnaRouter: router,
}


