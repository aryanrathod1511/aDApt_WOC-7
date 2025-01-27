const express = require("express");
const {queCategoryModel} = require("../models/queCategory");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");
const router = express.Router();
const {fetchCategory, addCategory, removeCategory,} = require("../controller/queCategory");
const {fetchQue, addQue} = require("../controller/question");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const fs = require('fs');
const path = require('path');


//fetch all categories
router.get("/", fetchCategory);

//add a category
router.post("/add", addCategory);

//delete a category
router.delete("/:category/remove", removeCategory);

//fetch all questions of a category
router.get("/:category/questions", fetchQue);

//add a question to a category
router.post("/:category/questions" ,upload.single('image'), addQue);

//delete a question from a category
module.exports = {
    qnaRouter: router,
}


