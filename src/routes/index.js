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

module.exports = router;