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
router.get('/', (req,res)=>{
    res.render('images');
})

router.get('/images/add', function renderAddImages(req, res){
    res.render('image_form');
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
    res.send('uploaded image')
})
module.exports = router;