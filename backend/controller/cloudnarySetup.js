const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dmfrhqk0z', 
    api_key: '439515985341239', 
    api_secret: 'K6zlO6UZJJlO9kGBXg7zX_hasXg' 
});

module.exports = {
    cloudinary : cloudinary,
}

