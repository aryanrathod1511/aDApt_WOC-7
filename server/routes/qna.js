const express = require("express");
const {queCategoryModel} = require("../models/queCategory");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");
const router = express.Router();
const {fetchCategory, addCategory, removeCategory,} = require("../controller/queCategory");
const {fetchQue, addQue} = require("../controller/question");
const {fetchAns, addAns} = require("../controller/answer");
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




//fetch all answer
router.get("/:category/answers/get", fetchAns);

//add an answer
router.post("/:category/answers/", upload.single('image'), addAns);
module.exports = {
    qnaRouter: router,
}


