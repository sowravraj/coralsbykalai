const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: "dwaqyaadq",
    api_key: "745216733386639",
    api_secret: "n0K5PIZpXXWQxrgL_IZ-s8pMRqM",
})

const storage = new multer.memoryStorage()

async function ImageUploadUtil(file) {

    const result = await cloudinary.uploader.upload(file,{
        resource_type: "auto"
    })

    return result
    
}

const upload = multer({ storage: storage})

module.exports = {upload, ImageUploadUtil}  