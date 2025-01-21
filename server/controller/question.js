const express = require("express");
const {queCategoryModel} = require("../models/queCategory");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const fetchQue = wrapAsync(async (req, res) => {
       const category = req.params.category;
        console.log("Category: ", category);

        const categoryObj = await queCategoryModel.findOne({ categoryName: category});
        if (!categoryObj) {
            return res.status(404).json({ msg: "Category not found" });
        }

        const questions = await queModel.find({ _id: { $in: categoryObj.questions } });
        res.json(questions);
   
});



const addQue = [
    upload.single('image'), // Middleware to process the file upload
    wrapAsync(async (req, res) => {
        const category = decodeURIComponent(req.params.category);

        const categoryObj = await queCategoryModel.findOne({ categoryName: category });
        if (!categoryObj) return res.status(404).json({ msg: "Category not found" });
    
        const { text, image } = req.body;
    
        let fileData = null;
        let fileType = null;
    
        if (image) {
            // Decode Base64 string
            const matches = image.match(/^data:(.+?);base64,(.+)$/);
            if (!matches) {
                return res.status(400).json({ msg: "Invalid Base64 string" });
            }
    
            fileType = matches[1]; // MIME type (e.g., 'image/png')
            const base64Data = matches[2]; // Base64 data
    
            fileData = Buffer.from(base64Data, 'base64');
        }
    
        // Save the question to the database
        const newQuestion = new queModel({
            text,
            categoryId: categoryObj._id,
            image: fileData
                ? {
                      data: fileData,
                      contentType: fileType,
                  }
                : null,
        });
    
        const savedQuestion = await newQuestion.save();
        console.log("New Question Saved: ", savedQuestion);
    
        categoryObj.questions.push(savedQuestion._id); // Push the question's ObjectId
        await categoryObj.save();
    
        res.status(201).json({ msg: "Question added successfully!" });
    }),
];


module.exports = {
    fetchQue,
    addQue,
}