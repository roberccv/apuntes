var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user){
    res.render('restricted');
  }else{
    res.render('index');
  }
});

module.exports = router;
