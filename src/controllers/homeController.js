var express = require("express");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var href = '', state = '', href_reg = '', state_reg ='';
  
  href = 'account/login';
  state = 'Log in';
  href_reg = "account/register";
  state_reg = "Register";
  title_header = "MY PAGE";
    
    res.render('index', { 
      href: href,
      state: state,
      href_reg:href_reg,
      state_reg: state_reg,
      title_header: title_header
    });
  });

module.exports = router;