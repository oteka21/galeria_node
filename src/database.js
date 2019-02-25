const mongoose = require('mongoose');

const string_db = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(string_db);

mongoose.connect(string_db,{
    useNewUrlParser: true,
})
.then(db => console.log('database is connected'))
.catch(err => console.error(err));
