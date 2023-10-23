function isEmpty(position){
    if(playerMoves[0][position] == "0" && playerMoves[1][position] == "0"){
        return true;
    }else{
        return false;
    }
}

function clickHandler(event){
    if(!win){
        var winMessage = document.getElementById("status");
        index = Array.from(parent.children).indexOf(event.target);
        if(isEmpty(index)){
            nextMove(index);
            moveAmount++;
            if(moveAmount >= 5){
                if(winChecker()[1] == 1 && winChecker()[1]){
                    winMessage.classList.add("you-won");
                    winMessage.innerHTML = "Congratulations! X is the Winner!";
                }else if(winChecker()[1] == 0 && winChecker()[0]){
                    winMessage.classList.add("you-won");
                    winMessage.innerHTML = "Congratulations! O is the Winner!";
                }
            }
        }
    }
}

function nextMove(position){
    if(currentMove == 2){
        parent.children[position].classList.add("X");
        parent.children[position].innerHTML = "X";
        playerMoves[1][position] = 1;
        currentMove = 1;
    }else{
        parent.children[position].classList.add("O");
        parent.children[position].innerHTML = "O";
        playerMoves[0][position] = 1;
        currentMove = 2;
    }
}

function isHover(event){
    if(event.type == "mouseover"){
        return true
    }else if(event.type == "mouseout"){
        return false
    }
}

function hoverHandler(event){
    index = Array.from(parent.children).indexOf(event.target);
    if(isHover(event)){
        parent.children[index].classList.add("hover");
    }else{
        parent.children[index].classList.remove("hover");
    }
}

function winChecker(){
    win = false;
    var matches = [0, 0];
    for(comboCount = 0; comboCount <= winCombos.length-1; comboCount++){
        for(innerCount = 0; innerCount <= winCombos[comboCount].length-1; innerCount++){
            if((playerMoves[0][innerCount] == 1) && (playerMoves[0][innerCount] == winCombos[comboCount][innerCount])){
                matches[0]++;
                if(matches[0] == 3){
                    win = true;
                    return [win, 0];
                }
            }

            if((playerMoves[1][innerCount] == 1) && (playerMoves[1][innerCount] == winCombos[comboCount][innerCount])){
                matches[1]++;
                if(matches[1] == 3){
                    win = true;
                    return [win, 1];
                }
            }
        }
        matches[0] = 0;
        matches[1] = 0;
    }
    return [win, -1];
}

function newGameHandler(event){
    if(moveAmount != 0){
        if(event){
            playerMoves = ["000000000", "000000000"];
            moveAmount = 0;
            win = false;
            document.getElementById("status").classList.remove("you-won");
            document.getElementById("status").innerHTML = "Move your mouse over a square and click to play an X or an O.";

            for(let count = 0; count <= loadBoard().children.length-1; count++){
                console.log(count)
                loadBoard().children[count].classList.remove("O");
                loadBoard().children[count].innerHTML = "";
                loadBoard().children[count].classList.remove("X");
            }
            // location.reload();
        }
    }
}

function runner(){
    parent = document.getElementById("board");
    childAmount = parent.childElementCount;
    buttons = document.getElementsByClassName("controls")
    newGameButton = buttons[0].addEventListener('click', newGameHandler); 

    for(childCount = 0; childCount <= childAmount-1; childCount++){
        parent.children[childCount].classList.add("square");
        parent.children[childCount].addEventListener('click', clickHandler);
        parent.children[childCount].addEventListener('mouseover', hoverHandler);
        parent.children[childCount].addEventListener('mouseout', hoverHandler);
        playerMoves[0].push(0);
        playerMoves[1].push(0);
    }
}

var win;
var parent; 
var childAmount;
var buttons;
var newGameButton;

const winCombos = [
    [1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,1],
    [1,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,1,0],
    [0,0,1,0,0,1,0,0,1],
    [1,0,0,0,1,0,0,0,1],
    [0,0,1,0,1,0,1,0,0]
]      

var moveAmount = 0;
var currentMove = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
var playerMoves = [[], []];

window.onload = runner;