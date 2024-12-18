var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro');
});
router.post('/', async function(req, res, next){
    const usuario = req.body.usuario;
    const contra = req.body.contra;
    try{
        await db.user.register(usuario, contra);
    }catch{
        console.log("no ha funcionado registrarse");
    }
   res.redirect('/');


})
module.exports = router;
