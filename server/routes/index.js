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
router.get('/item/:id', function(req, res){
  var response = utility.getItem(+req.params.id);
  res.json(response);
});

//POST route handler
router.post('/items', function(req, res) {
  var response = utility.createItem(req.body.name);
  res.json(response);
});

//PUT route handler
router.put('/item/:id', function(req, res){
  var response = utility.updateItem(+req.params.id, req.body);
  res.json(response);
});

//DELETE route handler
router.delete('/item/:id', function(req, res){
  var response = utility.deleteItem(+req.params.id);
  res.json(response);
});

module.exports = router;
