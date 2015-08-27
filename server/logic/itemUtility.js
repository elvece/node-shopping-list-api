var itemData = require('../models/items');
var storageItemsArr = itemData.storage.items;

//see if item is in the array based on id, return this filtered item if it is, otherwise, returns an empty array
function itemFilter(itemID){
  return storageItemsArr.filter(function(item){
    return itemID === item.id;
  });
}

//single GET request with error message
function getItem(itemID){
  var filteredItem = itemFilter(itemID);
  if (filteredItem.length === 0) {
    return {message: 'Item does not exist in this list.'};
  } else {
      return filteredItem;
    }
}

//handles POST request with error message and success message
function createItem(itemName){
  for (var i = 0; i < storageItemsArr.length; i++) {
    if (storageItemsArr[i].name === itemName){
    return {message: 'Item is already in this list.'};
    } else {
      itemData.storage.addItem(itemName);
      return {
        message: 'Item was successfully added to list.',
        newList: storageItemsArr};
    }
  }
}

//handles PUT request, which updates item with success message if item exists, adds item with success message if does not exist, and throws and error if item already exists
//needs an error to handle duplicates
function updateItem(itemID, body){
  //filters item from storageItemsArr based on itemID argument
  var filteredItem = itemFilter(itemID);
  //result holder

  //test if any data is passed in
  if (Object.keys(body).length === 0){
    return {message: 'Please enter something to change!'};
  }
  //update, add, or error
  for (var i = 0; i < storageItemsArr.length; i++) {
    //if item exists in array (from filter)
    if (filteredItem.length > 0){
      for (var key in body){//looking for the key of name in body params
        if (key === "name"){
          filteredItem[0].name = body.name;
        }
      }
      return {
        newList: storageItemsArr,
        message: 'Item was successfully updated.'
      };
      //if item not in list
    } else if (filteredItem.length === 0){
      //add item
      var addedItem = itemData.storage.addItem(body.name);
      return {
        list: storageItemsArr,
        message: 'Item added.'
      };
    } else {
      return {
        message: 'Item does not exist.'
      };
    }
  }
}

//handles DELETE request with success message if item is deleted and error message if item does not exist
function deleteItem(itemID){
  //get item by entered id
  var filteredItem = itemFilter(itemID);
  //result bucket
  var result;
  //if item exists, remove it from array
  if (filteredItem.length > 0){
    storageItemsArr.splice(itemID, 1);
    result = {
      updatedList: storageItemsArr,
      deletedItem: filteredItem,
      message: 'Item was successfully deleted.'
    };
  } else {
    result = {message: 'Item does not exist in the list.'};
  }
  return result;
}


module.exports = {
  storageItemsArr: storageItemsArr,
  itemFilter: itemFilter,
  getItem: getItem,
  createItem: createItem,
  updateItem: updateItem,
  deleteItem: deleteItem
};
