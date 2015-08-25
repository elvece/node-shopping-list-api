var express = require('express');
var router = express.Router();
var utility = require('../logic/itemUtility');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shopping List' });
});

// route handler
router.get('/items', function(req, res) {
  res.json(storage.items);
});

module.exports = router;
