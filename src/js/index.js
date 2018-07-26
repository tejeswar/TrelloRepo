/*
import {cube1} from './cube';
import '../css/style.css';
*/

console.log("This is index.js");
window.onload =function(){
console.log("window onload mehtod got called");

let exitingBoards =  getObjFromLocaleStorage(listOfBoardsConst); 
if(exitingBoards == null){
  persistObjInLocaleStorage(listOfBoardsConst,[]);
  console.log("==="+getObjFromLocaleStorage(listOfBoardsConst));
}
let boardId = getValueFromLocaleStorage(boardIdConst);
let listId = getValueFromLocaleStorage(listIdConst);
let cardId = getValueFromLocaleStorage(cardIdConst);
let anchorId = getValueFromLocaleStorage(anchorIdConst);
if(boardId == null){
let _boardId = 1;
persistValueInLocaleStorage(boardIdConst,_boardId);
}
//let = getValueFromLocaleStorage();
if(listId == null){
  let _listId = 1;
  persistValueInLocaleStorage(listIdConst,_listId);
}
//let = getValueFromLocaleStorage();
if(cardId == null){
  let _cardId = 1;
  persistValueInLocaleStorage(cardIdConst,_cardId);
}
//let = getValueFromLocaleStorage();
if(anchorId == null){
  let _anchorId = 1;
  persistValueInLocaleStorage(anchorIdConst,_anchorId);
}

}
$('#boardModal').on('click', '#save', function (event) {

  let button = $(event.relatedTarget) // Button that triggered the modal
  console.dir(button);
  let modal = $(this);
  console.dir(modal);
  let boardName = $('#formGroupExampleInput').val();
  console.log("Board title is:" + boardName);
  createBoard(boardName);
  console.log("Board got added");
  $('#close').click();

});
$('#listModal').on('click', '#listSave', function (event) {

  let listTitle = $('#formGroupListTitleInput').val();

  let boardId = document.getElementById("boardIdSpan").innerText;
  console.log("List title :" + listTitle + " going to be added with board id: " + boardId);
  //FIRST SHOW THE EXISTING LISTS IF ANY THEN APPEND THE NEWLY BEING CREATED LIST TO THE EXISTING
  /*
  let listOfABoard = getAllListsOfABoard(boardId);
  let listContainerDiv = "";
  if (listOfABoard.length == 0) {//if true,it means this is the first time listContainerDiv is going to be created.
    listContainerDiv = document.createElement('div');//<div id="listOfLists">
    listContainerDiv.setAttribute('id', listContainerConst);
    let specificBoard = document.getElementById(boardId);
    specificBoard.appendChild(listContainerDiv);
  }
  */
  /*
  if(document.getElementById('listOfLists')!=null || document.getElementById('listOfLists')!=undefined){
    console.log("*****************", document.getElementById('listOfLists'));
   document.getElementById('listOfLists').innerHtml = null;
  }
  */
 /*
  if (listOfABoard.length > 0) {
    document.getElementById(listContainerConst).innerHTML = "";
    for (var countOfList = 0; countOfList < listOfABoard.length; countOfList++) {
      // let existingListTitle = listOfABoard[countOfList].listTitle;
      let existingListObj = listOfABoard[countOfList];

      //console.log(existingListId+" going to be displayed in the UI" );


      showListOfLists(existingListObj);
    }
  }
  */
/*
  let loadExistingListInBoard= function(_boardId){
    let listData = getAllListsOfABoard(_boardId);
    for(var i=0;i<listData.length;i++){
     let listContainerDiv = document.createElement('div');//<div id="listOfLists">
    listContainerDiv.setAttribute('id', listContainerConst);
    let specificBoard = document.getElementById(_boardId);
    specificBoard.appendChild(listContainerDiv);
    let newlyCreatedListObj = createListObject(_boardId, listData[i].listTitle);
  createListInsideBoard(_boardId, newlyCreatedListObj);

  console.log("List got added to the board");
  console.log("Board '" + _boardId + "' has " + listOfABoard.length + " lists");


  showListOfLists(newlyCreatedListObj);
    }
  }
*/

  let newlyCreatedListObj = createListObject(boardId, listTitle);
  createListInsideBoard(boardId, newlyCreatedListObj);

  console.log("List got added to the board");
  console.log("Board '" + boardId + "lists");


  showListOfLists(newlyCreatedListObj);
  $('#listClose').click();

})
$('#cardModal').on('click', '#cardSave', function (event) {
  let cardTitle = $('#formGroupCardTitleInput').val();
  let cardDesc = $('#formGroupCardDescriptionInput').val();
  console.log("Card title :"+cardTitle + " is going to be saved");
    
  
  
  let iscardgettingEditted = localStorage.getItem(isCardBeingEditted);
  let iscardgettingsaved = localStorage.getItem(isCardBeingSaved);
  if(iscardgettingEditted === isCardBeingEdittedValue){
    
    let _beingEdittedCardId = localStorage.getItem(beingEdittedCardId);
    console.log(_beingEdittedCardId+"  card is going to be editted.");
    let cardObj = {};
    cardObj.cardId = _beingEdittedCardId;
    cardObj.cardTitle = cardTitle;
    cardObj.cardDesc = cardDesc;
    updateCardInsideList(cardObj);
    $('#cardClose').click();
    let boardId = _beingEdittedCardId.split("_")[0];
    let _thisObj = {};
    _thisObj.id = boardId;
    _thisObj.innerText = getSpecificBoardById(boardId).boardTitle;
    createSpecificBoardSection(_thisObj, "");
    //clean the locale storage once card edit is done else we will be in trouble
    localStorage.removeItem(isCardBeingEditted);
    localStorage.removeItem(beingEdittedCardId);
    console.log(_beingEdittedCardId+"  card got updated.");
  }
  else if(iscardgettingsaved === isCardBeingSavedValue){
    let _cardParentListId = localStorage.getItem(cardParentListId);
    let singleCardObj = createCardObject(_cardParentListId,cardTitle,cardDesc);
    createCardInsideList(singleCardObj);
    console.log("Card got added");
    $('#cardClose').click();
    let singleCardId = singleCardObj.cardId;
    let boardId = singleCardId.split("_")[0];
    let _thisObj = {};
    _thisObj.id = boardId;
    _thisObj.innerText = getSpecificBoardById(boardId).boardTitle;
    createSpecificBoardSection(_thisObj, "");
    //clean up the locale storage
    localStorage.removeItem(isCardBeingSaved);
    localStorage.removeItem(cardParentListId);
       
  }
  else{
    console.error("controll should not come inside it.something is wrong");
  }
  
})

// $(document).ready(function(){
//   $('.open-modal').click(function(){
// console.log('modal it going to be created');
// $('#cardModal').modal('show');  // show modal
// }); 
// });
