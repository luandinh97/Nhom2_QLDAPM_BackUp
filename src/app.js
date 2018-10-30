var express= require('express');
var exphbs= require('express-handlebars');
var exphbs_sections= require('express-handlebars-sections');
var body_parser= require('body-parser');
var path= require('path');
var session=require('express-session');

app.engine('handlebars',exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    helpers:{
        section: exphbs_sections(),
    }
}));
app.use(express.static(
    path.resolve(__dirname,'public')
));
app.set('view engine','handlebars');

var server= app.listen(3000, ()=>{

    console.log(`connected on port: ${server.address().port}`);
})