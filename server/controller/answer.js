const express = require("express");
const {answerModel} = require("../models/answer");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");
const multer = require("multer");
const fs = require('fs');
