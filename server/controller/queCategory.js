const express = require("express");
const {queCategoryModel} = require("../models/queCategory");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");

const fetchCategory = wrapAsync(async (req, res) => {
    const categories = await queCategoryModel.find({});
    res.json(categories);
});

const addCategory = wrapAsync(async (req, res) => {
    const {category} = req.body;
    const newCategory = new queCategoryModel({categoryName : category});
    await newCategory.save();
    res.json(newCategory);
});

const removeCategory = wrapAsync(async (req, res) => {
    const {category} = req.params;
    await queCategoryModel.deleteOne({categoryName: category});
    res.json({msg: "Category removed successfully."});
});

module.exports = {
    fetchCategory, addCategory, removeCategory,
}