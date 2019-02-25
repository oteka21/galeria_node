const { Router } =  require('express');
const photo = require('../models/photos');
const cloudinary = require('cloudinary');
const fs = require('fs');
const { promisify } = require('util');
const api = Router();


const deleteFile = promisify(fs.unlink);



api.get('/images/delete/:image_id', async function deleteImage(req,res){
    const {image_id } = req.params;
    const photoDeleted = await photo.findByIdAndDelete(image_id);
    await cloudinary.v2.uploader.destroy(photoDeleted.public_id);
    res.redirect('/images/add');
})

api.post('/images/add', async function addImages(req,res){
    const { title, description } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto = new photo({
         title,
         description,
         image_url: result.url,
         public_id: result.public_id
     })
    await newPhoto.save();
    await deleteFile(req.file.path);
    res.redirect('/');
});

module.exports = api;