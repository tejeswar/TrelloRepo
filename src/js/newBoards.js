console.log("newBoards.js got loaded");
function clearLocaleStorage(event) {
    localStorage.clear();
    console.log("Locale storage got cleared now:" + localStorage.length);
}
 function persistObjInLocaleStorage(key, _obj) {
    console.log(JSON.stringify(_obj));
    localStorage.setItem(key, JSON.stringify(_obj));
}
function persistValueInLocaleStorage(key, premitiveValue) {
    localStorage.setItem(key, premitiveValue);
}
function getObjFromLocaleStorage(_key) {
    return JSON.parse(localStorage.getItem(_key));
}
function getValueFromLocaleStorage(key) {
    return localStorage.getItem(key);
}
function updateBoardObjInLocalStorage(_boardObj) {
    let allBoardObjs = getObjFromLocaleStorage(listOfBoardsConst);
    if (allBoardObjs != null && allBoardObjs.length > 0) { }
    for (let count = 0; count < allBoardObjs.length; count++) {
        let singleBoardObj = allBoardObjs[count];
        if (singleBoardObj.boardId == _boardObj.boardId) {
            allBoardObjs[count] = _boardObj;
        }
    }
    //the below line I put in order to sync the state of locale storage and application object.
    // listOfBoards = allBoardObjs;!123a
    persistObjInLocaleStorage(listOfBoardsConst, allBoardObjs);
}



function generateIdForBoard() {
    let boardId = parseInt(getValueFromLocaleStorage(boardIdConst));
    persistValueInLocaleStorage(boardIdConst, boardId + 1);
    return "board" + boardId;

}

function Board(boardTitle) {
    this.boardId = generateIdForBoard();
    this.boardTitle = boardTitle;
    this.arrOfLists = [];
    let displayBoard = function () {
        console.log("boardId:" + this.boardId + "##" + this.boardTitle);
    }
};
function createBoard(boardTitle) {
    var boardObj = new Board(boardTitle);
    // listOfBoards.push(boardObj);//!123a
    let listOfBoards = getObjFromLocaleStorage(listOfBoardsConst);//!123a


    listOfBoards.push(boardObj);//!123a


    persistObjInLocaleStorage(listOfBoardsConst, listOfBoards);
}
/*
function getSpecificBoard(boardTitle) {
    console.log("Board title is:" + boardTitle);
    for (var boardCount = 0; boardCount < listOfBoards.length; boardCount++) {
        let singleBoard = listOfBoards[boardCount];
        if (singleBoard.boardTitle == boardTitle) {
            console.log("match found with board title:" + singleBoard.boardTitle);
            return listOfBoards[boardCount];
        }
        return [];
    }
}
*/
function getSpecificBoardById(_boardId) {
    console.log("Board Id is:" + _boardId);
    let _listOfBoards = getObjFromLocaleStorage(listOfBoardsConst);
    for (var boardCount = 0; boardCount < _listOfBoards.length; boardCount++) {
        let singleBoard = _listOfBoards[boardCount];
        if (singleBoard.boardId == _boardId) {
            console.log("match found with board Id:" + singleBoard.boardId);
            return _listOfBoards[boardCount];
        }
    }
    return [];

}

function getAllListsOfABoard(_boardId) {
    let singleBoard = getSpecificBoardById(_boardId);
    if (singleBoard != null && singleBoard.arrOfLists.length > 0) {
        return singleBoard.arrOfLists;
    }
    return [];
}
/*
function addListToBoard(boardId, listObj) {
    let singleBoard = getSpecificBoard(boardId);
    singleBoard.arrOfLists.push(listObj);
}
*/

//========================LIST RELATED THINGS================

//let arrOfLists = [];
function generateIdForList(boardId) {
    let listId = parseInt(getValueFromLocaleStorage(listIdConst));
    persistValueInLocaleStorage(listIdConst, listId + 1);
    return boardId + "_list" + listId;
}
function List(boardId, listTitle) {
    this.listId = generateIdForList(boardId);
    this.listTitle = listTitle;
    this.arrOfCards = [];
    function displayList() {
        console.log("listId:" + this.listId + "@@" + this.listTitle);
    }
}
function createListObject(boardId, listTitle) {
    var listObj = new List(boardId, listTitle);
    return listObj;
}
function createListInsideBoard(boardId, listObj) {
    var singleBoard = getSpecificBoardById(boardId);
    if (singleBoard != null && singleBoard.arrOfLists != null) {

        singleBoard.arrOfLists.push(listObj);
        //also update in the listOfBoards
        let listOfBoards = getObjFromLocaleStorage(listOfBoardsConst);//!123a
        updateBoardInsideArrOfBoards(listOfBoards, singleBoard);
        //persistObjInLocaleStorage(listOfBoardsConst,listOfBoards);
        //updateBoardObjInLocalStorage(singleBoard);
    }
}
function updateBoardInsideArrOfBoards(_listOfBoards, _singleBoard) {

    if (_listOfBoards != null && _listOfBoards.length > 0) { }
    for (let count = 0; count < _listOfBoards.length; count++) {
        let singleBoardObj = _listOfBoards[count];
        if (singleBoardObj.boardId == _singleBoard.boardId) {
            _listOfBoards[count] = _singleBoard;
        }
    }
    persistObjInLocaleStorage(listOfBoardsConst, _listOfBoards);
}
function getSpecificListById(_listId) {
    let boardId = _listId.split('_')[0];
    //let listId = _listId.split('_')[1];
    let singleBoard = getSpecificBoardById(boardId);
    if (singleBoard != null && singleBoard.arrOfLists != null) {
        for (let listCount = 0; listCount < singleBoard.arrOfLists.length; listCount++) {
            let singleList = singleBoard.arrOfLists[listCount];
            if (singleList.listId == _listId) {
                return singleList;
            }
        }
        return null;
    }
}
function updateListObjInsideBoard(_listObj) {
    let _listId = _listObj.listId;
    let boardId = _listId.split('_')[0];
    let listId = _listId.split('_')[1];
    let singleBoard = getSpecificBoardById(boardId);
    for (let listCount = 0; listCount < singleBoard.arrOfLists.length; listCount++) {
        let singleListObj = singleBoard.arrOfLists[listCount];
        if (singleListObj.listId == _listId) {
            singleBoard.arrOfLists[listCount] = _listObj;
        }
    }
    let listOfBoards = getObjFromLocaleStorage(listOfBoardsConst);
    updateBoardInsideArrOfBoards(listOfBoards, singleBoard);
    //no need to save the data in the locale storage here.updated data will be saved inside the updateBoardInsideArrOfBoards all together.
    //updateBoardObjInLocalStorage(singleBoard);
    console.log(_listId + " got updated successfully in the board and locale storage");

}
//////////////////////////////////////////////////////////////////////////////

//let arrOfCards = [];
function generateIdForCard(_listId) {
    let cardId = parseInt(getValueFromLocaleStorage(cardIdConst));
    persistValueInLocaleStorage(cardIdConst, cardId + 1);
    return _listId + "_card" + cardId;
}
function Card(_listId, _cardTitle, _cardDesc) {
    this.cardId = generateIdForCard(_listId);
    this.cardTitle = _cardTitle;
    this.cardDesc = _cardDesc;
}
function createCardObject(_listId, _cardTitle, _cardDesc) {

    let cardObj = new Card(_listId, _cardTitle, _cardDesc);
    return cardObj;
}

function createCardInsideList(_cardObj) {
    let wholecardId = _cardObj.cardId;
    //wholecardId will be of the format board1_list1_card1
    let boardId = wholecardId.split('_')[0];
    let listId = wholecardId.split('_')[1];
    let cardId = wholecardId.split('_')[2];
    let singleListObj = getSpecificListById(boardId + "_" + listId);
    if (singleListObj != null && singleListObj.arrOfCards != null) {
        singleListObj.arrOfCards.push(_cardObj);

    }
    updateListObjInsideBoard(singleListObj);
    console.log("card got saved successfully inside the list");
}
function updateCardInsideList(_cardObj) {

    let wholecardId = _cardObj.cardId;
    console.log(wholecardId + " is going to be updated");
    let boardId = wholecardId.split('_')[0];
    let listId = wholecardId.split('_')[1];
    let cardId = wholecardId.split('_')[2];
    let singleBoard = getSpecificBoardById(boardId);
    for (let listCount = 0; listCount < singleBoard.arrOfLists.length; listCount++) {
        let singleListObj = singleBoard.arrOfLists[listCount];
        if (singleListObj.listId == boardId + "_" + listId) {
            let _arrOfCards = singleListObj.arrOfCards;
            for (let cardCount = 0; cardCount < _arrOfCards.length; cardCount++) {
                if (wholecardId == _arrOfCards[cardCount].cardId) {
                    let matchedCardObj = _arrOfCards[cardCount];
                    matchedCardObj.cardTitle = _cardObj.cardTitle;
                    matchedCardObj.cardDesc = _cardObj.cardDesc;
                }
            }
        }
    }
    updateBoardObjInLocalStorage(singleBoard);
    console.log(wholecardId + " got updated successfully");
}
function getCardObjectById(_cardId) {//_cardId will be of the format like board1_list1_card1
    let singleListObj = getSpecificListById(_cardId.split('_')[0] + "_" + _cardId.split('_')[1]);
    let _arrOfCards = singleListObj.arrOfCards;
    for (let cardCount = 0; cardCount < _arrOfCards.length; cardCount++) {
        if (_cardId == _arrOfCards[cardCount].cardId) {
            console.log("match found with cardId : " + _cardId);
            let matchedCardObj = _arrOfCards[cardCount];
            return matchedCardObj;
        }
    }
    return null;
}

function removeCard(_cardId) {//_cardId=board1_list1_card1
    console.log(_cardId + " going to be deleted");
    let matchedListPosition = null;
    let boardId = _cardId.split("_")[0];
    let _listId = boardId + "_" + _cardId.split("_")[1];
    let singleBoard = getSpecificBoardById(boardId);
    for (let listCount = 0; listCount < singleBoard.arrOfLists.length; listCount++) {
        let singleListObj = singleBoard.arrOfLists[listCount];
        if (singleListObj.listId == _listId) {
            let _arrOfCards = singleListObj.arrOfCards;
            for (let cardCount = 0; cardCount < _arrOfCards.length; cardCount++) {
                if (_cardId == _arrOfCards[cardCount].cardId) {


                    _arrOfCards.splice(cardCount, 1);
                    singleListObj.arrOfCards = _arrOfCards;
                    console.log(_cardId + "  got deleted successfully....");
                    //console.log(singleListObj.arrOfCards);  
                    updateListObjInsideBoard(singleListObj);
                    //console.log(arrOfBoards);
                }
            }
        }
    }

}

