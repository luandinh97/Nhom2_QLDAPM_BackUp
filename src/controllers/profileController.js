var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    var username = '', email = '';
    var href_res = '', state_res ='';
    
    href_res = "#";
    state_res = "Reset-Password";
    email  = "BonbanhProfile@gmail.com";
    username  = "BonBanhProfile";

    res.render('profile',{
        username:username,
        email:email,
        href_res:href_res,
        state_res:state_res
      

    });
});


module.exports = router;