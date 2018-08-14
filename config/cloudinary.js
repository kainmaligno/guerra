const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const keys = require('./keys');
cloudinary.config({
  cloud_name: keys.cloud_Name,
  api_key: keys.cloud_api_key,
  api_secret: keys.cloud_api_secret
});

let storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-name', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png','gif','jpeg'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name  (file.originalname)
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;