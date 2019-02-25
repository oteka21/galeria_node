const express = require('express'); 
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
require('./database');

// expres config
app.set('port', process.env.APP_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname))
    }
});
app.use(multer({ storage }).single('image'));


//routes
app.use(require('./routes'));

//api
app.use(require('./api'));

module.exports = app;
