const { Router } =  require('express');
const router = Router();
const photo = require('../models/photos');
const cloudinary = require('cloudinary');
const fs = require('fs');
const { promisify } = require('util');
const deleteFile = promisify(fs.unlink);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
router.get('/', async (req,res)=>{
    const photos = await photo.find();
    res.render('images',{ photos });
})

router.get('/images/add', async function renderAddImages(req, res){
    const photos = await photo.find();
    res.render('image_form', { photos });
})
router.post('/images/add', async function addImages(req,res){
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

router.get('/images/delete/:image_id', async function deleteImage(req,res){
    const {image_id } = req.params;
    const photoDeleted = await photo.findByIdAndDelete(image_id);
    await cloudinary.v2.uploader.destroy(photoDeleted.public_id);
    res.redirect('/images/add');

})

module.exports = router;