// constructor
function ItemLibrary() {
  this.items = [];
  this.id = 0;
}

// methods
ItemLibrary.prototype.addItem = function(name) {
  var newItem = {
    name: name,
    id: this.id
  };
  this.items.push(newItem);
  this.id += 1;
};

// create some instances
var storage = new ItemLibrary();
storage.add('Noodles');
storage.add('Tomatoes');
storage.add('Peppers');




module.exports = {
  ItemLibrary: ItemLibrary,
};
