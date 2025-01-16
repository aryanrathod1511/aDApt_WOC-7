const express = require("express");
const router = express.Router();
const { categoryModel, emailModel } = require("../db/schema");
const { wrapAsync } = require("../utils/wrapAsync");

// Fetch all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories." });
  }
});

// Fetch all email IDs for a specific category
router.get("/categories/:categoryId/emails", wrapAsync(async (req, res) => {
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



}));

// Add a category
router.post("/categories/add", async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) return res.status(400).json({ error: "Category is required." });

    const newCategory = await categoryModel.create({ categoryName: category });
    res.status(201).json({ msg: "Category added successfully!", category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add category." });
  }
});

// Delete a category
router.delete("/categories/:categoryId/remove", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const response = await categoryModel.findByIdAndDelete(categoryId);
    if (!response) return res.status(404).json({ error: "Category not found." });

    res.status(200).json({ msg: "Category removed successfully!", category: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove category." });
  }
});

// Add an email ID to a specific category
router.post("/categories/:categoryId/emails/add", wrapAsync(async (req, res) => {
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

}));

// Remove an email ID from a specific category
router.delete("/categories/:categoryId/emails/:emailId/remove", async (req, res) => {
  try {
    const { emailId } = req.params;
    const response = await emailModel.findOneAndDelete({ emailId });
    if (!response) return res.status(404).json({ error: "Email not found." });

    res.status(200).json({ msg: "Email removed successfully!", email: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove email." });
  }
});

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Working fine!" });
});

module.exports = {
  mailRouter: router,
};
