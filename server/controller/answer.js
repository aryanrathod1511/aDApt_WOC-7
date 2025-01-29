const express = require("express");
const {answerModel} = require("../models/answer");
const {queModel} = require("../models/que");
const {wrapAsync} = require("../utils/wrapAsync");
const cloudinary = require("../config/cloudnarySetup");
const multer = require("multer");
const fs = require('fs');
const storage = multer.memoryStorage();

const fetchAns = wrapAsync(async (req, res) => {
    const {category} = req.params;
    const {questionId} = req.query;    
    const answers = await answerModel.find({questionId}); 
    res.status(200).send(answers);

});

const addAns = wrapAsync(async (req,res) => {
    const {category} = req.params;
    const {questionId, text} = req.body;
    const image = req.body.file;

    const question = await queModel.findById(questionId);
    if(!question){
        return res.status(404).json({message: "Question not found"});
    }
    
    const result = null;
    if(image) {
       result = await cloudinary.uploader.upload(`data:image/png;base64,${image}`, {
            resource_type: "auto",
            folder: `Qna/answers/${category}/images`,
        }, (error)=> {
            if(error) throw new Error(error);
        });
    }

    const newAnswer = new answerModel({
        text,
        questionId,
        image: {
            url: result!=null ? result.secure_url : null,
            public_id: result!=null ? result.public_id : null,
        }
    });
    const savedAnswer = await newAnswer.save();
    console.log("New Answer Saved: ", savedAnswer);
    res.status(200).send(savedAnswer);
});

module.exports = {
    fetchAns,
    addAns,
}


