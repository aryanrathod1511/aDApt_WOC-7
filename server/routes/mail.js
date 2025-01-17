const express = require("express");
const router = express.Router();
exports.router = router;
const { categoryModel } = require("../models/category");
const { emailModel} = require("../models/email");
const { wrapAsync } = require("../utils/wrapAsync");
const { fetchCategories, fetchEmails, addCategory, deleteCategory, addEmailId, removeEmailId } = require("../controller/emailManagement");


// Fetch all categories
router.get("/categories",fetchCategories);

// Fetch email IDs for a category
router.get("/categories/:categoryId/emails",fetchEmails);

// Add a category
router.post("/categories/add", addCategory);

// Delete a category
router.delete("/categories/:categoryId/remove", deleteCategory);

// Add email ID to a category
router.post("/categories/:categoryId/emails/add", addEmailId);

// Remove an email ID from a category
router.delete("/categories/:categoryId/emails/:emailId/remove",removeEmailId);

module.exports = {
  mailRouter: router,
};
