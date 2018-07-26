console.log("eventHandlingMethod.js got loaded");

function generateBoardAnchorId(boardId) {
    let anchorId = getValueFromLocaleStorage(anchorIdConst);
    return boardId + "_anchor" + anchorId++;
}
function createListOfBoardLinks(event) {
    console.log("createListOfBoardLinks=link of boards...");
    let myNavdiv = document.getElementById("dropdownmenumore");
    myNavdiv.innerHTML = "";//it fixed an initial problem.else in the dropdown duplicate board will be coming
    let listOfBoards = getObjFromLocaleStorage(listOfBoardsConst);
    if(listOfBoards!=null)
    for (var count = 0; count < listOfBoards.length; count++) {
        let singleBoardObj = listOfBoards[count];
        let boardTitle = singleBoardObj.boardTitle;
        let boardId = singleBoardObj.boardId;
        newlink = document.createElement('a');
        newlink.setAttribute('class', 'dropdown-item');
        newlink.setAttribute('href', '#');
        let boardAnchorId = generateBoardAnchorId(boardId);
        newlink.setAttribute('id', boardAnchorId);
        // newlink.setAttribute('onclick',createSpecificBoardSection());
        newlink.addEventListener('click', function () {
            // `this` refers to the anchor tag that's been clicked
            createSpecificBoardSection(this, boardTitle);


        }, true);
        newlink.innerHTML = "" + boardTitle;
        myNavdiv.appendChild(newlink);

    }


}

function createAddListButton(boardTitle) {
    console.log("======createAddListButton========");

    let newButton = document.createElement('button');
    newButton.setAttribute('id', 'saveList');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('class', 'btn btn-primary');
    newButton.setAttribute('data-toggle', 'modal');
    newButton.setAttribute('data-target', '#listModal');
    newButton.setAttribute('data-placement', 'top');
    newButton.innerText = "+Add List";

    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'addListButton');
    newDiv.appendChild(newButton);


    return newDiv;

}

/*
The below method gets called only when the anchor tag of existing board willl get clicked
1)First get the board object
2)then create the board dom
     first create the board header section

*/
function createSpecificBoardSection(thisObj, boardTitle) {
    console.log("createSpecificBoardSection:board anchor tag got clicked");
    var anchorId = thisObj.id;
    var boardId = anchorId.split('_')[0];
    var boardName = thisObj.innerText;//it will give the visible text of the anchor(board) tag

    //FIRST GET THE BOARD MODEL FROM THE DB
    let singleBoardObj = getSpecificBoardById(boardId);


    let boardContainer = document.getElementById(boardContainerConst);
    boardContainer.innerHTML = "";
    let specificBoardDiv = document.createElement('div');
    specificBoardDiv.setAttribute('id', boardId);
    specificBoardDiv.setAttribute('class', "specificBoardClass");
    /*
    As early as posible I am just attaching specificBoardDiv to boardContainer.bcoz if i think to completely
    make the specificBoardDiv(with all its associated elements such as list and cards),then I will attach it
    to the boardContainer,then chances are there in the middle I might face the null pointer exception and then
    specificBoardDiv will never to attached to the boardContainer.
    */
    boardContainer.appendChild(specificBoardDiv);
    /* 
     <div id="specificBoardName">
     <span id="boardHeader">Selected board name:</span>
     <span id="boardIdSpan">1</span>
     </div>
    */
    let spanHeaderTag = document.createElement('span');
    spanHeaderTag.setAttribute('id', "boardHeader");
    spanHeaderTag.innerHTML = boardName;

    let spanHeaderIdTag = document.createElement('span');
    spanHeaderIdTag.setAttribute('id', "boardIdSpan");
    spanHeaderIdTag.innerHTML = boardId;

    let specificBoardNameDiv = document.createElement('div');
    specificBoardNameDiv.setAttribute('id', "specificBoardName");
    specificBoardNameDiv.appendChild(spanHeaderTag);
    specificBoardNameDiv.appendChild(spanHeaderIdTag);

    specificBoardDiv.appendChild(specificBoardNameDiv);
    console.log("**************************************");
    console.log(specificBoardDiv);
  

    //THIS IS THE ONLY PLACE WHERE WE CAN CHECK IF ANY LIST ITEMS ARE THERE IN THE BOARD OR NOT.IF THERE JUST DISPLAY IT.
    let newButton = createAddListButton(boardTitle);

    specificBoardDiv.appendChild(newButton);

    ///////////////////////
    let listOfABoard = getAllListsOfABoard(boardId);
  let listContainerDiv = "";
  //if(document.getElementById(listContainerConst)== null || document.getElementById(listContainerConst)==undefined){
    
    listContainerDiv = document.createElement('div');//<div id="listOfLists">
 listContainerDiv.setAttribute('id', listContainerConst);
 specificBoardDiv.appendChild(listContainerDiv);
//}
  if (listOfABoard.length == 0) {//if true,it means this is the first time the board anchor tag got clicked or no list has been added to this board before
   /*
    if(document.getElementById(listContainerConst)== null || document.getElementById(listContainerConst)==undefined){
        //
        listContainerDiv = document.createElement('div');//<div id="listOfLists">
     listContainerDiv.setAttribute('id', listContainerConst);
     specificBoardDiv.appendChild(listContainerDiv);
    }    
    //let specificBoard = document.getElementById(boardId);
    */
  }
  else{
    let arrOfListsOfASingleBoard = singleBoardObj.arrOfLists;
    if (arrOfListsOfASingleBoard != null && arrOfListsOfASingleBoard.length > 0) {
        for (let countOfList = 0; countOfList < arrOfListsOfASingleBoard.length; countOfList++) {
            let existingListObj = arrOfListsOfASingleBoard[countOfList];
            showListOfLists(existingListObj);
        }

        
    }

  }
  //boardContainer.appendChild(specificBoardDiv);
}
