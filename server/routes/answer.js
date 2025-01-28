const express = require("express");
const {answerModel} = require("../models/answer");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const fs = require('fs');
const path = require('path');

//add questions
router.post("")
