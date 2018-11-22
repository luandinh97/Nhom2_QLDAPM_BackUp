var express = require("express");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  
    
    res.render('admin-home', { 
      name: 'Le Phuc Lam',
      layout: "admin-layout",
      title: 'WELCOME TO ADMIN-PAGE'
    });
  });

  router.post('/logout', function(req, res, next) {
    var href = '', state = '', href_reg = '', state_reg ='';
  
    href = 'account/login';
    state = 'Log in';
    href_reg = "account/register";
    state_reg = "Register";
    
    res.render('index', { 
      href: href,
      state: state,
      href_reg:href_reg,
      state_reg: state_reg,
      layout: "main",
     
    });
  }); 
  
  
module.exports = router;