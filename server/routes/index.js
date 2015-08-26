var express = require('express');
var router = express.Router();
var utility = require('../logic/itemUtility');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shopping List' });
});

//GET route handler - all items
router.get('/items', function(req, res) {
  res.json(utility.storageItemsArr);
});

//GET route handler - single item by id
router.get('/items/:id', function(req, res){
  var response = utility.itemFilter(+req.params.id);
  res.json(response);
});

//POST route handler
router.post('/items', function(req, res) {
  var response = utility.postHandler(req.body.name);
  res.json(response);
});

//PUT route handler
router.put('/items/:id', function(req, res){
  var response = utility.putHandler(req.params.id, req.body.name);
  res.json(response);
});

module.exports = router;
