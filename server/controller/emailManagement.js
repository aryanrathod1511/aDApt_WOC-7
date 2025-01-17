const express = require("express");
const {emailModel} = require("../models/email");
const {categoryModel} = require("../models/category");
const {wrapAsync} = require("../utils/wrapAsync");
const expressError = require("../utils/expressError");
//const { router } = require("../routes/mail");

//fetch all categories
const fetchCategories = wrapAsync( async (req, res) => {
   
      const categories = await categoryModel.find({});
      res.status(200).json(categories);
  });

//fetch all emails
const fetchEmails =  wrapAsync(async (req, res) => {
  const { categoryId } = req.params;
  const decodedCategory = decodeURIComponent(categoryId); 
  console.log("Finding emails for " + decodedCategory);

  const category = await categoryModel.find({categoryName: decodedCategory});
  const category_id = category._id;
  console.log("Category Id is : " + category_id);

  // Fetch emails
  const emails = await emailModel.find({categoryId: category_id});
  console.log("Fetched emails : ", emails);

  res.status(200).json(emails);
});

const addCategory = wrapAsync(async (req, res) => {
    const { category } = req.body;
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
  const { mail, name } = req.body;
  
      // Find the category by its name
      const category = await categoryModel.findOne({ categoryName: decodedCategory });

      // If category is not found, return an error
      if (!category) {
          return res.status(404).json({ error: "Category not found." });
      }

      const newEmail = await emailModel.create({
          emailId: mail,
          hostName: name,    
          category: category._id, 
      });

      // Respond with success and the created email
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