var express = require('express');
var router = express.Router();


router.get('/login', (req, res) => {
    res.render('account/login');
});

router.get('/register', (req, res) => {
    res.render('account/register');
});

module.exports = router;