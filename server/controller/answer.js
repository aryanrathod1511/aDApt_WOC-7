const express = require("express");
const {answerModel} = require("../models/answer");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");
const cloudinary = require("../config/cloudnarySetup");
const multer = require("multer");
const fs = require('fs');
const storage = multer.memoryStorage();


