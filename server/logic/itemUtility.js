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
    return {message: 'Item does not exist in this list'};
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
      return {message: 'Item was successfully added to list.', newList: storageItemsArr};
    }
  }
}

//handles PUT request with success message, updates item if exists, otherwise adds item
//needs an error to handle if no name submitted in body
//needs an error to handle duplicates
function updateItem(itemID, body){
  //filters item from storageItemsArr based on itemID argument
  var filteredItem = itemFilter(itemID);
  //result holder
  var result;
  //if item exists from filter
  if (filteredItem.length > 0){
    for (var key in body){//looking for the key of name in body params
      if (key === "name"){
        filteredItem[0].name = body.name;
      }
    }
    result = {
      updatedItem: filteredItem[0],
      message: 'Item was successfully updated'
    };
  } else {
      //if the item is not anywhere in the array, add the item
      //otherwise, error: this item already exists, if you want to update the item, reference the list for the item's id and update it using the item's id
      //be sure to print out list in return message

      //if item exists in array
      if (filteredItem.length > 0) {
        //adds item based on name entered into body
        var addedItem = itemData.storage.addItem(body.name);
        result = {
          //gets item from storage item array based on id
          addedItem: storageItemsArr.itemID,
          updatedList: storageItemsArr,
          message: 'Since this item did not exist, item was successfully added to the shopping list with a sequential id number.'
        };
      } else {
        result = {
          list: storageItemsArr,
          message: 'This item already exists in the list. If you want to update the item, reference the list below and find the item id for the item you wish to change. Then, update the item using the proper id.'
        };
      }
      // //adds item based on name entered into body
      // var addedItem = itemData.storage.addItem(body.name);
      // result = {
      //   //gets item from storage item array based on id
      //   addedItem: storageItemsArr.itemID,
      //   message: 'Since this item did not exist, Item successfully added to the shopping list.'
      //   //QUESTION: when i set id params to number that is not in sequential order, why does it not display the addedItem portion of the result, but only the message
      // };
    }
  return result;
}

//handles DELETE request
function deleteItem(){
  //sucess message if item is deleted
  //error message if item does not exist
}


module.exports = {
  storageItemsArr: storageItemsArr,
  itemFilter: itemFilter,
  getItem: getItem,
  createItem: createItem,
  updateItem: updateItem
};
