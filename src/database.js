const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST,{
    useNewUrlParser: true,
})
.then(db => console.log('database is connected'))
.catch(err => console.error(err));
