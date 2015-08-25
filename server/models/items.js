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


module.exports = {
  ItemLibrary: ItemLibrary,
  storage: storage
};
