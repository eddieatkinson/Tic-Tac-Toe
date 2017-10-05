var whosTurn = 1;
var numPlayers = 1;
var player1Squares = [];
var player2Squares = [];
var name = "Myself!";
var gameOver = true;
var reset = document.getElementById('reset');
var greatMoveMsg = "Great move!"
var spotTakenMesg = "Sorry. That square is taken."

var allWinningRows = [];
var allWinningColumns = [];
var allWinningDiags = [];
allWinningDiags[0] = [];
allWinningDiags[1] = [];
var sideLength = prompt("How many squares wide would you like?");
// var numWaysToWin = (sideLength * 2) + 2;
var playingBoard;
var scores = [0, 0];

var squares = document.getElementsByClassName('square');
// var numPlayers = prompt("Would you like 1 or 2 players (please enter a number)? ");


// ---Board-building---
document.getElementById('board').innerHTML = fillBoard(sideLength);
function fillBoard(sideLength){
	for (let i = 0; i < sideLength; i++){
		playingBoard += '<div class="board-row">';
		for (let j = 0; j < sideLength; j++){
			playingBoard +=`<button id="${j}${i}" class="square" style='width:${185*3/sideLength}px; height:${185*3/sideLength}px'>-</button>`;
		}
		playingBoard += '</div>';
	}
	return playingBoard;
}

function markSquare(squareClicked){
	if(squareClicked.innerHTML !== "-"){
		document.getElementById('message').innerHTML = spotTakenMesg;
		console.log(squareClicked.innerHTML);
	}else if(whosTurn === 1){
		document.getElementById('message').innerHTML = greatMoveMsg;
		squareClicked.innerHTML = 'X';	
		whosTurn = 2;
		player1Squares.push(squareClicked.id);
		checkWin(player1Squares, 1);
		if(numPlayers == 1 && !gameOver){
			computerMove();
		}
	}else{
		document.getElementById('message').innerHTML = greatMoveMsg;
		squareClicked.innerHTML = 'O';
		whosTurn = 1;
		player2Squares.push(squareClicked.id);
		checkWin(player2Squares, 2);
	}
}



function endGame(winningCombo, playerNum){
	if(playerNum == 1){
		scores[0]++;
	}else{
		scores[1]++;
	}
	document.getElementById('message').innerHTML = `Congratulations to Player ${playerNum}!`;
	gameOver = true; 
	for(let i = 0; i < sideLength; i++){
		var theSquare = document.getElementById(winningCombo[i]);
		console.log(theSquare);
		theSquare.className += ' winning-square';
	}
	reset.innerHTML = 'Play again?';
	reset.addEventListener('click', resetByUser);
	document.getElementsByClassName('player1-score')[0].innerHTML = scores[0];
	document.getElementsByClassName('player2-score')[0].innerHTML = scores[1];
}


function gameOn(){
	for (let i = 0; i < squares.length; i++){
		squares[i].addEventListener('click', function(event){
			if(!gameOver){
				markSquare(this);
			}
		})
	}
}



reset.addEventListener('click', resetByUser);

function resetByUser(event){
	var validUserReset = true;
	if(gameOver === false){
	var userReset = prompt("Are you sure you would like to reset the board ('y' or 'n')?");
	if(userReset === null){ 
		return;
	}
	while (validUserReset){
		if(userReset == 'y'){
			whosTurn = 1;
			player1Squares = [];
			player2Squares = [];
			for (let i = 0; i < squares.length; i++){
				squares[i].innerHTML = "-";
			}
			document.getElementById('message').innerHTML = "";
			validUserReset = false;
		}else if(userReset != 'n'){
			userReset = prompt("Please choose 'y' or 'n'.");
		}else{
			validUserReset = false;
		}
	}
	}else{
		whosTurn = 1;
		player1Squares = [];
		player2Squares = [];
		reset.innerHTML = 'Reset';
		for (let i = 0; i < squares.length; i++){
			squares[i].innerHTML = "-";
			squares[i].classList.remove('winning-square');
		}
		document.getElementById('message').innerHTML = "";
		gameOver = false;
	}
}

gameOn();

// ------WIN CHECKING------


// ---Create winning array---
for (let i = 0; i < sideLength; i++){
  allWinningRows[i] = [];
	for (let j = 0; j < sideLength; j++){
		allWinningRows[i].push(`${i}${j}`); // Rows
	}
}
for (let i = 0; i < sideLength; i++){
  allWinningColumns[i] = [];
	for (let j = 0; j < sideLength; j++){
		allWinningColumns[i].push(`${j}${i}`); // Columns
	}
}
for (let i = 0; i < sideLength; i++){
	for (let j = 0; j < sideLength; j++){
		if(j == i){
			allWinningDiags[0].push(`${i}${j}`);
		}
	}
}
for (let i = (sideLength - 1); i >= 0; i--){
	for (let j = (sideLength - 1); j >= 0; j--){
		if(i + j == sideLength - 1){
			allWinningDiags[1].push(`${i}${j}`);
			break;
		}
	}
}
var allWinningCombos = allWinningRows.concat(allWinningColumns, allWinningDiags);
// console.log(allWinningCombos);




function checkWin(currentPlayerSquares, playerNum){
	for (let i = 0; i < allWinningCombos.length; i++){
		var squareCount = 0;
		for (let j = 0; j < allWinningCombos[i].length; j++){
			var winningSquare = allWinningCombos[i][j];
			if(currentPlayerSquares.indexOf(winningSquare) !== -1){
				squareCount++;
				// console.log(squareCount);
			}
		} 
		if(squareCount == sideLength){
			// console.log('winner!');
			// console.log(allWinningCombos[i]);
			endGame(allWinningCombos[i], playerNum);
			break;
			
		}
	}
}

function computerMove(){
	// find a random square
	// see if that square is empty
	// if it is, send it to square
	// if it's not, keep looking
	var squareFound = false;
	while(!squareFound){
		rand = Math.floor(Math.random() * sideLength * sideLength);
		var isTaken = squares[rand].innerHTML;
		if(isTaken === '-'){
			squareFound = true;
		}
	}
	markSquare(squares[rand]);
}

document.getElementById('one-player').addEventListener('click', function(event){
	// console.log("User has chosen a one player game")
	gameOver = false;
	numPlayers = 1;
	var nameBox = document.getElementById('player-name');
	if(nameBox.value !== ""){
		name = nameBox.value
	}
});

document.getElementById('two-player').addEventListener('click', function(event){
	// console.log("User has chosen a two player game");
	gameOver = false;
	numPlayers = 2;
	var nameBox = document.getElementById('player-name');
	if(nameBox.value !== ""){
		name = nameBox.value
	}	
});

// function computerMove(){
// 	for (let i = 0; i < sideLength; i++){
// 		var oCount = 0;
// 		var xCount = 0;
// 		var emptyCount = 0;
// 		var availableSpace;
// 		for (let j = 0; j < sideLength; j++){
// 			if(document.getElementById(allWinningCombos[i][j]).innerHTML = '-'){
// 				emptyCount++;
// 				availableSpace = allWinningCombos[i][j];
// 			}else if(document.getElementById(allWinningCombos[i][j]).innerHTML = 'O'){
// 				oCount++;
// 			}else{
// 				xCount++;
// 			}
// 		}
// 		if(oCount + emptyCount == sideLength){
// 				markSquare(document.getElementById(availableSpace));
// 			}
// 	}
// }