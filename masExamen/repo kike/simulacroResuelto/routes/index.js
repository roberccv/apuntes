const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user:req.session.user, title:"Embutidos León"});
});

module.exports = router;
