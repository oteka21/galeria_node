const {model, Schema } = require('mongoose');

const Photo = new Schema({
    title: String,
    description: String,
    image_url: String,
    public_id: String 
})

module.exports = model('Photo', Photo);