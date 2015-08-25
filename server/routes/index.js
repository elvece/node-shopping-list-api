var express = require('express');
var router = express.Router();
// var utility = require('../logic/itemUtility');
// var allItems = require('../models/items');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shopping List' });
});

//GET route handler - all items
router.get('/items', function(req, res) {
  res.json(storage.items);
});

//POST route handler -
router.post('/items', function(req, res) {
  // add code here to create new item instance
  storage.addItem(req.body.name);
});




// Constructor
function ItemLibrary() {
  this.items = [];
  this.id = 0;
}

// Methods
ItemLibrary.prototype.addItem = function(name) {
  var newItem = {
    name: name,
    id: this.id
  };
  this.id += 1;
  this.items.push(newItem);
};

// Instances
var storage = new ItemLibrary();
storage.addItem('Noodles');
storage.addItem('Tomatoes');
storage.addItem('Peppers');

// console.log(storage);



module.exports = router;
