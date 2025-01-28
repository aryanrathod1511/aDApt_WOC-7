const express = require("express");
const {queCategoryModel} = require("../models/queCategory");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");
const cloudinary = require("../config/cloudnarySetup");
const fs = require('fs');
const multer = require("multer");
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

const addQue = wrapAsync(async (req, res) => {
    const category = decodeURIComponent(req.params.category);

    const categoryObj = await queCategoryModel.findOne({ categoryName: category });
    if (!categoryObj) return res.status(404).json({ msg: "Category not found" });

    const { text, file } = req.body;

    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${file}`, {
            resource_type: "auto",
            folder : `Qna/question/${category}/images`,
        }, (error) => {
            if (error) throw new Error(error);
        });

        // Save the question to the database
        const newQuestion = new queModel({
            text,
            categoryId: categoryObj._id,
            image: {
                url: result.secure_url,
                public_id: result.public_id // Save the public_id to delete the image later
            }
        });

        const savedQuestion = await newQuestion.save();
        console.log("New Question Saved: ", savedQuestion);

        // Push the question's ObjectId to the category's question list
        categoryObj.questions.push(savedQuestion._id); 
        await categoryObj.save();

       
        res.status(201).send(savedQuestion);

    } catch (error) {
        console.log("Error during file upload:", error);
        res.status(500).json({ msg: "Error uploading file to Cloudinary", error });
    }
});

module.exports = {
    fetchQue,
    addQue,
}