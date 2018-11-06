var express = require("express");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var href = '', state = '', action = '';
    href = '#';
    state = 'Log in';
  
    
    res.render('index', { 
      href: href,
      state: state,
      title_header: 'Home Page'
    });
  });

module.exports = router;