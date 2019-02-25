if(process.env.NODE_ENV == 'development'){
    require('dotenv').config();
}
const app = require('./app');

app.listen(app.get('port'), function listenServer(){
    console.log('server is runing in ' + app.get('port'));
})