var express = require("express");
var router = express.Router();

router.get('/',function(req, res, next) {
    res.render('index',{title_header:"MY BONBANH"});
})

module.exports = router;