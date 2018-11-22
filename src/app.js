var express= require('express');
const app = express();
var exphbs= require('express-handlebars');
var exphbs_sections= require('express-handlebars-sections');
var body_parser= require('body-parser');
var path= require('path');
var session=require('express-session');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
app.use(logger('dev'));
app.use(cookieParser());
app.engine('handlebars',exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(
    path.resolve(__dirname,'public')
));
app.set('view engine','handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use("/",require('./controllers/homeController'));
app.use("/",require('./controllers/detailsControler'));
app.use("/",require('./controllers/saleController'));
app.use('/account', require('./controllers/accountController'));
app.use("/profile",require('./controllers/profileController'));
app.use("/admin-layout",require('./controllers/admin-layout'));
var server= app.listen(3000, ()=>{

    console.log(`connected on port: ${server.address().port}`);
})