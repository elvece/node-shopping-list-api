## Node Shopping List API

***This repo contains my solution to the following exercise:***

Let's build the back-end for a basic shopping list application.

> Start by scaffolding out a new Express Boilerplate.

### GET All Items

Start by adding functionality for users to view your shopping list. In other words, we need to handle getting *all* items from the shopping list. Set up a `/items` route within *routes/index.js*:

```javascript
// constructor
function ItemLibrary() {
  this.items = [];
  this.id = 0;
}

// methods
ItemLibrary.prototype.addItem = function(name) {
  var newItem = {name: name, id: this.id};
  this.items.push(newItem);
  this.id += 1;
};

// create some instances
var storage = new ItemLibrary();
storage.add('Noodles');
storage.add('Tomatoes');
storage.add('Peppers');

// route handler
router.get('/items', function(req, res) {
  res.json(storage.items);
});
```

Here, we created a new container and added some item instances to it. What's happening in the route handler? Be sure to test this out in the browser.

### POST Single Item

Next, add a route handler for POSTing items:

```javascript
router.post('/items', function(req, res) {
  // add code here to create new item instance
});
```

Test with HTTPie - `$ http POST http://localhost:3000/ name=Sausage`. Then fire a GET request, from the browser, to ensure that Sausage is returned as well.

### PUT Single Item

Add a PUT endpoint - `/item/<id>`. Return a success message, along with the edited item, if the item exists. If the item does not exist, be sure to add it. Think about how you would handle errors gracefully.

Test this out - update an item, make sure to test with the GET request in the browser.

### DELETE Single Item

Add a DELETE endpoint - `/item/<id>`. Return a success message if the item is deleted or an error message if the item does not exist.
