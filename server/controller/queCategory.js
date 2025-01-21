const express = require("express");
const {queCategoryModel} = require("../models/queCategory");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");

const fetchCategory = wrapAsync(async (req, res) => {
    const categories = await queCategoryModel.find({});
    const categoryName = categories.map((category) => category.categoryName);
    res.json(categoryName);
});

const addCategory = wrapAsync(async (req, res) => {
    const {category} = req.body;
    const newCategory = new queCategoryModel({categoryName : category});
    await newCategory.save();
    res.json(newCategory);
});

const removeCategory = wrapAsync(async (req, res) => {
    const {category} = req.params;
    //delete all question for that category
    const categoryObj = await queCategoryModel.findOne({categoryName: category});
    if (!categoryObj) {
        return res.status(404).json({msg: "Category not found"});
    }
    const questions = await queModel.deleteMany({category: categoryObj._id});
    //delete the category
    await queCategoryModel.deleteOne({categoryName: category});
    res.json({msg: "Category removed successfully."});
});

module.exports = {
    fetchCategory, addCategory, removeCategory,
}