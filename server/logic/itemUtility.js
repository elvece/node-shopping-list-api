var itemData = require('../models/items');
var storageItemsArr = itemData.storage.items;

//filter by id helper method, returns item if there, message if not
function itemFilter(itemID){
  var filteredItem = storageItemsArr.filter(function(item){
    return itemID === item.id;
    });
  if (filteredItem.length === 0) {
    return {message: 'Item does not exist in this list'};
  } else {
      return filteredItem;
    }

}

function postHandler(name){
  //if item is already in list, message saying so
  //else, add item

}

//if item already exists, return message that item was successfully updated and return that updated item
//if item is not in list, add it to list and return message that it was successfully added
function putHandler(itemID, itemName){
  if (storageItemsArr.id === itemID) {
    storageItemsArr.name = itemName;
    return {
      updatedItem: storageItemsArr.name,
      message: 'Item was successfully updated in the shopping list.'
    };
  }
  else {
    return {
      addedItem: itemData.storage.addItem(itemName),
      message: 'Item successfully added to the shopping list.'
    };
  }
}

//other put attempts
//if the id in items array in storage is equal to the params id, then update the name
  // for (var i = 0; i < storageItemsArr.length; i++) {
  //   if (storageItemsArr[i].id === req.params.id){
  //       storageItemsArr[i].name = name;
  //     }
  //     return {message: };

  //   else {
  //     itemData.storage.addItem(name);
  //     message: 'Item successfully added to the shopping list.'
  //   }
  // }



module.exports = {
  storageItemsArr: storageItemsArr,
  itemFilter: itemFilter,
  putHandler: putHandler
};
