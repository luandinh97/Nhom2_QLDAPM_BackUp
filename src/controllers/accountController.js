var express = require('express');
var router = express.Router();


router.get('/login', (req, res) => {
    var href = '', state = '', href_reg = '', state_reg ='';
  
    href = '/account/login';
    state = 'Log in';
    href_reg = "/account/register";
    state_reg = "Register";
    res.render('account/login',{
        href:href,
        href_reg:href_reg,
        state_reg:state_reg,
        state:state
    });
});

router.get('/register', (req, res) => {
    var href = '', state = '', href_reg = '', state_reg ='';
  
    href = '/account/login';
    state = 'Log in';
    href_reg = "/account/register";
    state_reg = "Register";
    res.render('account/register',{
        href:href,
        href_reg:href_reg,
        state_reg:state_reg,
        state:state
    });
});

module.exports = router;