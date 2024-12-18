var express = require('express');
var router = express.Router();
var db = require('../database');


router.post('/', function(req, res, next){
    req.session.cookieComprobada = true;
    if (req.session.user){
        //db.user.savecookies(req.session.user.name);
        console.log(db.user);
    }
    res.json({
        haFuncionado: true
    });
});
module.exports = router;