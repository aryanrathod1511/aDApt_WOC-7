const express = require("express");
const router = express.Router();
const {categoryModel} = require("../db/schema");
const {emailModel} = require("../db/schema");

//fetch categories 
router.get("/", (req,res)=> {
    res.json({
        msg:"Working fine!"
    });
})
router.get("/categories", async (req,res)=>{
    let emailDomains = [];
    emailDomains = await categoryModel.find({});
    res.json(emailDomains);
});
// fetch all emailIds for a category
router.get("/categories/:categoryId/emails", async (req,res)=> {
    console.log(req.params.categoryId);
    const categoryId = req.params.categoryId;
    let emailIds = [];
    emailIds = await emailModel.findMany({categoryId:categoryId});
    res.json(emailIds);
});
//add an emailId
router.post("/categories/add",async (req,res)=>{
    const category = req.body.category;
    const response = await categoryModel.insert({
        categoryName:category,
    });
    res.json({
        response,
    });
});
//delete a category
router.delete("/categories/:categoryId/remove", async (req,res)=>{
    const categoryId = req.params.categoryId;
    const response = await categoryModel.delete({_id : categoryId});
    res.json({
        response,
    })
});
//add emailId in a perticular category
router.post("/categories/:categoryId/emails/add",async (req,res)=>{
    const categoryId = req.params.categoryId;
    const mailData = req.body.emailData;
    const emailId = mailData.mail;
    const hostName = mailData.name;
    const response = await emailModel.insert({
        emailId: emailId,
        hostName: hostName,
        categoryId : categoryId,
    });
    console.log("email added");
});
//remove emailId from a perticular category
router.delete("/categories/:categoryId/emails/:emailId/remove", async (req,res)=>{
    const emailId = req.params.emailId;
    const response = await emailModel.delete({emailId:emailId});
    res.json({
        response,
    });
    console.log("email removed");
});

module.exports = {
    mailRouter : router,
}