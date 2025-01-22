const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret:  process.env.CLOUD_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath)=> {
    try{
        if(!localFilePath){
            throw new Error("Invalid File Path");
        }
        const result = await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"} );

        console.log("File uploaded successfully");
        console.log(result.url);
        return result;

    } catch (error) {
        console.log("Error in uploading file on cloudinary", error);
        fs.unlinkSync(localFilePath); //remove file from local storage
        return null; 
    }
}

module.exports = {
    cloudinary : cloudinary,
    uploadOnCloudinary : uploadOnCloudinary,
}

