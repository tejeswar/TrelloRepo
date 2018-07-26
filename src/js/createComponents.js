/*
<div id="listOfLists">
<div id="singleList" class="task-list"> 
       
            <div class="task-header">
               <span>list header<span>
            </div>

          
            <div class="todo-task">
                <div class="task-header">Sample Header</div>
                <div class="task-description">Lorem Ipsum Dolor Sit Amet</div>
                <button>Edit</button>
            </div>
            <div class="addCardButton">
                <button id="save" type="button" class="btn btn-primary" data-toggle="modal" data-target="#cardModal" data-placement="top"
                    title="Click on here to subscribe for our recent news">Add Card</button>
            </div>
       
    </div>singleList
    </div>listOfLists
    */
/*
function allowDrop(ev){
    ev.preventDefault();
    console.log("<<<<<<allowDrop");
}
*/
function drop(ev) {
    //ev.preventDefault();
   // event.stopPropagation();
    let data = ev.dataTransfer.getData("text");
    console.log(data+" is going to be added in:"+ev.target);//board1_list1_card1 is going to be added in:
    //console.dir(ev.target);
    let targetElementId = null;
    let droppedLocationClassName = ev.target.className;
console.log("droppedLocationClassName:"+droppedLocationClassName);//task-header , addCardButton
let droppedLocationParentId = ev.target.parentNode.id;
console.log(droppedLocationParentId);//board1_list2
if(droppedLocationClassName === "task-header" || droppedLocationClassName === "addCardButton" ||droppedLocationClassName ===  "btn btn-primary open-modal"){
    targetElementId = droppedLocationParentId;
}
else if(droppedLocationClassName === "task-list"){
    targetElementId = ev.target.id;
}
else if(droppedLocationClassName === "todo-task"){
    targetElementId = droppedLocationParentId;
}
else if(droppedLocationClassName === "deleteCard"){
    targetElementId = droppedLocationParentId.split("_")[0]+droppedLocationParentId.split("_")[1];
}
else if(droppedLocationClassName === "editCard"){
    targetElementId = droppedLocationParentId.split("_")[0]+droppedLocationParentId.split("_")[1];
}
else{
    //console.warn("control should never come to this block....");
}
   
    console.log("Dropped location id :"+targetElementId);//targetElementId:board1_list2
    
    ev.target.appendChild(document.getElementById(data));
/////////////////// UPDATE YOUR DATA MODEL ACCORDINGLY //////////
if(!(targetElementId === null || targetElementId === undefined || targetElementId === '')){
    let singleCardObj = getCardObjectById(data);
    //we are creating a new card obj so that we can insert it in the target list and then we can remove  the dragged card from the source list.
let newCardObj = createCardObject(targetElementId,singleCardObj.cardTitle,singleCardObj.cardDesc);
createCardInsideList(newCardObj);
removeCard(singleCardObj.cardId);

let boardId = targetElementId.split("_")[0];
let _thisObj = {};
_thisObj.id = boardId;
_thisObj.innerText = getSpecificBoardById(boardId).boardTitle;
createSpecificBoardSection(_thisObj, "");



}
//let singleCardObj = getCardObjectById(data);

//we are creating a new card obj so that we can insert it in the target list and then we can remove  the dragged card from the source list.
//let newCardObj = createCardObject(targetElementId,singleCardObj.cardTitle,singleCardObj.cardDesc);
//createCardInsideList(newCardObj);
//removeCard(singleCardObj.cardId);


   
    
}

 function showListOfLists(listObj) {
    console.log("creating list of lists");
    //first find the parent board from the this listObj;
    let listTitle = listObj.listTitle;
    let listId = listObj.listId;//listId will be of the form board1_list1
    let boardId = listId.split('_')[0];
    //By this time one div with boardId must have been created.
    let singleBoardDiv = document.getElementById(boardId);
    let listContainerDiv = document.getElementById(listContainerConst);

    let singleListDiv = document.createElement('div');//<div id="singleList" class="task-list">
    singleListDiv.setAttribute('id', listId);
    singleListDiv.setAttribute('class', 'task-list');

    singleListDiv.addEventListener("dragover",function(event){
        event.preventDefault();
        //allowDrop(event);//not required
    },false);
    singleListDiv.addEventListener("drop",function(event){
       // alert('dropped');
        drop(event);
    },false);

    let listHeaderDiv = document.createElement('div');// <div class="task-header">
    listHeaderDiv.setAttribute('class', 'task-header');
    let listHeaderSpan = document.createElement('span');//<span>list header<span>
    listHeaderSpan.innerText = listTitle;
    listHeaderDiv.appendChild(listHeaderSpan); //</div>
   singleListDiv.appendChild(listHeaderDiv);
//at the earliest i just completed the creation of singleListDiv by appending it to listContainerDiv so that
//by the time card will be created,this singleListDiv will be already there.
   listContainerDiv.appendChild(singleListDiv);
    //listOfListsDiv.appendChild(singleListDiv);
    ///////////////ADD ALL THE CARDS TO THE LIST          ////////
    let noOfCardsInsideList = listObj.arrOfCards.length;
    console.log(listId +" has "+noOfCardsInsideList+" cards");
    for(let cardCount = 0;cardCount<noOfCardsInsideList;cardCount++){
        let singleCardObj = listObj.arrOfCards[cardCount];
        createSingleCardDOM(singleCardObj);
    }


/*
    $( "#"+listId).sortable({
        update: function( event, ui ) {
            console.log("hello sortable");
        }
      });
*/
    //////////////////////////////////////////////////////////////////////////////
    let addCardButtonDiv = document.createElement('div');// <div class="addCardButton">
    addCardButtonDiv.setAttribute('class', 'addCardButton');
    let addCardButton = document.createElement('button');//<button id="save" type="button" class="btn btn-primary"
    addCardButton.setAttribute('id', 'save');
    addCardButton.setAttribute('type', 'button');
    addCardButton.setAttribute('class', 'btn btn-primary open-modal');
    addCardButton.setAttribute('data-toggle', 'modal');
    addCardButton.setAttribute('data-target', '#cardModal');

    addCardButton.addEventListener('click', function(event) {
        // `this` refers to the anchor tag that's been clicked
       console.log("modal going to be poped up");
       let parentListId = $(this).parent().parent().attr('id');
       console.log("Parent list is:"+parentListId);

       //just save this parentListId so that we can use while actually saving the card
       localStorage.setItem(cardParentListId,parentListId);
       localStorage.setItem(isCardBeingSaved,isCardBeingSavedValue);

      }, true);
    addCardButton.setAttribute('data-placement', 'top');
    addCardButton.innerText = 'Add Card';
    addCardButtonDiv.appendChild(addCardButton);// </div>
    singleListDiv.appendChild(addCardButtonDiv);

        //listContainerDiv.appendChild(singleListDiv);
        singleBoardDiv.appendChild(listContainerDiv);
       
       
       // listOfListsDiv.appendChild(addCardButtonDiv);
    //let boardContainer = document.getElementById("boardContainer");
    //boardContainer.appendChild(listOfListsDiv);



}
/*

<div id="cardId" class="todo-task">
    <div class="task-header">Sample card Header</div>
    <div class="task-description">Lorem Ipsum Dolor Sit Amet</div>
    <button>Edit</button>
</div>
<div class="addCardButton">
    <button id="save" type="button" class="btn btn-primary" data-toggle="modal" data-target="#cardModal" data-placement="top"
        title="Click on here to subscribe for our recent news">Add Card</button>
</div>

*/
/*
function drag(ev){
   ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target.id+ " going to be dragged");
}
*/
 function createSingleCardDOM(_singelCarObj) {
    let cardId = _singelCarObj.cardId;
    let parentListId = cardId.split("_")[0]+"_"+cardId.split("_")[1];
    let parentListDiv = document.getElementById(parentListId);

let cardIdDiv = document.createElement("div");
cardIdDiv.setAttribute("id",_singelCarObj.cardId);
console.log("#"+_singelCarObj.cardId);
//$("#"+_singelCarObj.cardId).draggable();
cardIdDiv.setAttribute("class","todo-task");
cardIdDiv.setAttribute("style","background:green");

cardIdDiv.setAttribute("draggable","true");
cardIdDiv.addEventListener("dragstart",function(event){
    console.log(event.target.id+" getting dragged");
    event.dataTransfer.setData("text", event.target.id);
    //drag(event);
});


let cardTitleDiv = document.createElement("div");
cardTitleDiv.setAttribute("class","task-header");
cardTitleDiv.innerText = _singelCarObj.cardTitle;
cardIdDiv.appendChild(cardTitleDiv);

let cardDescDiv = document.createElement("div");
cardDescDiv.setAttribute("class","task-description");
cardDescDiv.innerText = _singelCarObj.cardDesc;
cardIdDiv.appendChild(cardDescDiv);

let cardEditButton = document.createElement("button");
cardEditButton.setAttribute("class","editCard");
cardEditButton.innerText = "Edit";
cardIdDiv.appendChild(cardEditButton);
cardEditButton.addEventListener("click",function(){
    let _that = this;
    populateModal(_that);

});
let cardDeleteButton = document.createElement("button");
cardDeleteButton.setAttribute("class","deleteCard");
cardDeleteButton.innerText = "delete";
cardDeleteButton.addEventListener("click",function(event){
    let cardId = $(this).parent().attr('id');
    console.log("delte card:"+parentListId);
    removeCard(cardId);
    let boardId = cardId.split("_")[0];
let _thisObj = {};
_thisObj.id = boardId;
_thisObj.innerText = getSpecificBoardById(boardId).boardTitle;
createSpecificBoardSection(_thisObj, "");
});

cardIdDiv.appendChild(cardDeleteButton);


parentListDiv.appendChild(cardIdDiv);
console.log("createSingleCardDOM::  "+parentListDiv);

}
 function populateModal(_this) {
  
  //console.dir(_this);
  let editCardId = $(_this).parent().attr("id");
  console.log("edit card got clicked:"+editCardId);
  //saving this property in order to know whether 'save card' is being called as part of editing or adding
  localStorage.setItem(isCardBeingEditted,isCardBeingEdittedValue);
  localStorage.setItem(beingEdittedCardId,editCardId);
  let singleCardObj = getCardObjectById(editCardId);
  $('#formGroupCardTitleInput').val(singleCardObj.cardTitle);
  $('#formGroupCardDescriptionInput').val(singleCardObj.cardDesc);
      $("#cardModal").modal();
    }

