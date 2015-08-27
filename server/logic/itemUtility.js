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
  var result;
  //test if any data is passed in
  if (Object.keys(body).length === 0){
    return {message: 'Please enter something to change!'};
  }
  //if item exists in array (from filter)
  if (filteredItem.length > 0){
    for (var key in body){//looking for the key of name in body params
      if (key === "name"){
        filteredItem[0].name = body.name;
      }
    }
    result = {
      updatedItem: filteredItem[0],
      newList: storageItemsArr,
      message: 'Item was successfully updated'
    };
  } else if (body.name === filteredItem[0].name){
      result = {
        list: storageItemsArr,
        message: 'This item already exists in the list. If you want to update the item, reference the list below and find the item id for the item you wish to change. Then, update the item using the proper id.'
      };
    } else {
      //adds item based on name entered into body
      var addedItem = itemData.storage.addItem(body.name);
      result = {
        //gets item from storage item array based on id
        addedItem: storageItemsArr.itemID,
        updatedList: storageItemsArr,
        message: 'Since this item did not exist, item was successfully added to the shopping list with a sequential id number.'
      };
      }
      // //adds item based on name entered into body
      // var addedItem = itemData.storage.addItem(body.name);
      // result = {
      //   //gets item from storage item array based on id
      //   addedItem: storageItemsArr.itemID,
      //   message: 'Since this item did not exist, Item successfully added to the shopping list.'
      //   //QUESTION: when i set id params to number that is not in sequential order, why does it not display the addedItem portion of the result, but only the message
      // };}
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
