const express = require("express");
const {emailModel} = require("../models/email");
const {categoryModel} = require("../models/category");
const {wrapAsync} = require("../utils/wrapAsync");
const expressError = require("../utils/expressError");

//fetch all categories
const fetchCategories = wrapAsync( async (req, res) => {
   
      const categories = await categoryModel.find({});
      res.status(200).json(categories);
  });

//fetch all emails
const fetchEmails = wrapAsync(async (req, res) => {
    const categoryId  = req.params.categoryId;  
    const decodedCategory = decodeURIComponent(categoryId);
    // Fetch the category by its name
    const category = await categoryModel.findOne({ categoryName: decodedCategory });
    if (!category) {
        return res.status(404).json({ error: "Category not found." });
    }

    // Fetch emails associated with the category
    const emails = await emailModel.find({ categoryId: category._id });

    res.status(200).json(emails);
});

//add a category
const addCategory = wrapAsync(async (req, res) => {
    const { category } = req.body;
    console.log("received category is " + category);
    if (!category) return res.status(400).json({ error: "Category is required." });

    const newCategory = await categoryModel.create({ categoryName: category });
    res.status(201).json({ msg: "Category added successfully!", category: newCategory });

})

//delete a category
const deleteCategory = wrapAsync(async (req, res) => {

      const { categoryId } = req.params;
      const response = await categoryModel.findByIdAndDelete(categoryId);
      if (!response) return res.status(404).json({ error: "Category not found." });
  
      res.status(200).json({ msg: "Category removed successfully!", category: response });
});

//add email ID
const addEmailId = wrapAsync(async (req, res) => {
    const { categoryId } = req.params; 
    const decodedCategory = decodeURIComponent(categoryId); 
    const { mail, name } = req.body.emailData;
    const category = await categoryModel.findOne({ categoryName: decodedCategory });

    if (!category) {
        return res.status(404).json({ error: "Category not found." });
    }

    // Create a new email document
    const newEmail = await emailModel.create({
        emailId: mail,        
        hostName: name,        
        categoryId: category._id, 
    });

    console.log("New Email: ", newEmail);

    res.status(201).json({ msg: "Email added successfully!", email: newEmail });
});


//remove emailID
const removeEmailId = wrapAsync( async (req, res) => {
      const { emailId } = req.params;
      const response = await emailModel.findOneAndDelete({ emailId });
      if (!response) return res.status(404).json({ error: "Email not found." });
  
      res.status(200).json({ msg: "Email removed successfully!", email: response });
});

module.exports = {
    fetchCategories, fetchEmails, addCategory, deleteCategory, addEmailId, removeEmailId,
}