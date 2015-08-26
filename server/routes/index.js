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

//POST route handler -n
router.post('/items', function(req, res) {//edit to include message if item already in list
  //create new item instance
  utility.itemData.storage.addItem(req.body.name);
  res.send(utility.itemData.storage);
});

//PUT route handler
router.put('/items/:id', function(req, res){
  var response = utility.putHandler(req.params.id, req.params.name);
  res.json(response);
});

module.exports = router;
