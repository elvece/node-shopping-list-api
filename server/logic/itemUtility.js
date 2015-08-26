var itemData = require('../models/items');
var storageItemsArr = itemData.storage.items;

//filter by id helper method, returns item if there, message if not
function itemFilter(itemID){
  return storageItemsArr.filter(function(item){
    return itemID === item.id;
  });
}

function handleSingleGet(itemID){
  var filteredItem = itemFilter(itemID);
  if (filteredItem.length === 0) {
    return {message: 'Item does not exist in this list'};
  } else {
      return filteredItem;
    }
}

function postHandler(itemName){
  for (var i = 0; i < storageItemsArr.length; i++) {
    if (storageItemsArr[i].name === itemName){
    return {message: 'Item is already in this list.'};
    } else {
      itemData.storage.addItem(itemName);
      return storageItemsArr;
    }
  }
}

//if item already exists, return message that item was successfully updated and return that updated item
//if item is not in list, add it to list and return message that it was successfully added
function putHandler(itemID, itemName){
  //if itemID exists, update
  //if itemID does not exist, create
  for (var i = 0; i < storageItemsArr.length; i++) {
    if (storageItemsArr[i].id === itemID){
      storageItemsArr[i].name = itemName;
      return {
        updatedItem: filteredItem,
        message: 'Item was successfully updated in the shopping list.'
      };
    } else {
        return {
          addedItem: itemData.storage.addItem(itemName),
          message: 'Item successfully added to the shopping list.'
        };
      }
    }
}

console.log(putHandler(4, 'tomatoes'));
console.log(storageItemsArr);




module.exports = {
  storageItemsArr: storageItemsArr,
  itemFilter: itemFilter,
  postHandler: postHandler,
  putHandler: putHandler
};
