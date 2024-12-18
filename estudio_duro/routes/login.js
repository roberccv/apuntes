var express = require('express');
var router = express.Router();
const db = require('../database');

router.post('/', async function(req, res, next) {
    const usuario = req.body.usuario;
    const contra = req.body.contra;
    if(await db.user.isLoginRight(usuario,contra)){
        req.session.user = {
            name: usuario
        }
        res.redirect('/restricted');
    }else{
        req.session.error = "Incorrect username or password.";
        console.log("NO ESTAS REGISTRADO BOBO");
        res.redirect('/');
    }
   
});

module.exports = router;
