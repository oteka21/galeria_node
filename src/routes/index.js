const { Router } =  require('express');
const router = Router();

router.get('/', (req,res)=>{
    res.render('images');
})

router.get('/images/add', function renderAddImages(req, res){
    res.render('image_form');
})

module.exports = router;