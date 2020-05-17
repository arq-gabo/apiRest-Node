const cloudinary = require('cloudinary');

const secrets = require('../config/secrets');

cloudinary.config(secrets.cloudinary);

module.exports = function(imagePath){
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imagePath, function(result){
            console.log(result);
            if(result.secure_url){
                return resolve(resolve.secure_url);
            } else {
                reject(new Error('Error with cloudinary'));
            }
        })
    })
}