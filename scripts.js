// 1. Set up board. --check.
// 2. User should be able to click on a button. When that happens,
// 	the square should have that player's mark (X or O). --check.
// 3. If it's X's turn, put an X in it...
// 4. 3. means we need to keep track of whose turn it is. When X goes,
// 	it becomes X's turn and likewise.
// 5. Check to see if someone won the game. If so, congratulate them.
// 6. Highlight the winning squares.
// 7. The game must stop when someone wins.

// GLOBALS
// init whosTurn as player 1's turn
var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var winningCombos = [
	['A1', 'B1', 'C1'],
	['A2', 'B2', 'C2'],
	['A3', 'B3', 'C3'],
	['A1', 'A2', 'A3'],
	['B1', 'B2', 'B3'],
	['C1', 'C2', 'C3'],
	['A1', 'B2', 'C3'],
	['A3', 'B2', 'C1']
];
var gameOver = false;
var reset = document.getElementById('reset');

// Two things happen when someone clicks:
// 1. We change the DOM (for the user).
// 2. We change the vars (for JavaScript).

function markSquare(squareClicked){
	// console.log(squareClicked);
	// console.log(squareClicked.innerHTML);
	if(squareClicked.innerHTML !== "-"){
		document.getElementById('message').innerHTML = "Sorry. That square is taken.";
	}else if(whosTurn === 1){
		document.getElementById('message').innerHTML = "Great move!";
		squareClicked.innerHTML = 'X';	
		whosTurn = 2;
		player1Squares.push(squareClicked.id);
		checkWin(player1Squares, 1);
		// console.log("player 1: " + player1Squares);
	}else{
		document.getElementById('message').innerHTML = "Great move!";
		squareClicked.innerHTML = 'O';
		whosTurn = 1;
		player2Squares.push(squareClicked.id);
		checkWin(player2Squares, 2);
		// console.log("player 2:" + player2Squares);
	}
	// checkWin();
}

function checkWin(currentPlayerSquares, playerNum){
	// OUTTER LOOP - check each winning combination
	for (let i = 0; i < winningCombos.length; i++){
		// Keep track of how many of THIS winning combo the player has.
		var squareCount = 0;
		// INNER LOOP - check a square inside a winning combination
		for (let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			if(currentPlayerSquares.indexOf(winningSquare) !== -1){
				// The square belongs to the player. We do not care where.
				squareCount++;
			}
		} // end of j loop (row/diag/colum complete)
		// check to see if the squareCount === 3
		if(squareCount === 3){
			// Move stuff to a function.
			endGame(winningCombos[i], playerNum);
			break;
			
		}
	}
}

function endGame(winningCombo, playerNum){
	// WINNER WINNER CHICKEN DINNER
	// console.log(`Player ${playerNum} won the game!`);
	document.getElementById('message').innerHTML = `Congratulations to Player ${playerNum}!`;
	gameOver = true; // Ends the game.
	// Loop through the winning combo, and add a class.
	for(let i = 0; i < winningCombo.length; i++){
		var theSquare = document.getElementById(winningCombo[i]);
		theSquare.className += ' winning-square';
	}
	reset.innerHTML = 'Play again?';
	reset.addEventListener('click', resetByUser);
}

// squares is an array with 9 objects. Each object is the JS representation of the HTML
var squares = document.getElementsByClassName('square');
// console.log(squares[0]);
// console.dir(squares[0]); // how JS sees it
function gameOn(){
	for (let i = 0; i < squares.length; i++){
		// console.log(squares[i]);
		// console.dir(squares[i]);
		// Now that we have each square individually (squares[i]), we will add a click listener.
		// Adding an event listener goes:
		// 1. What to listen to
		// 2. addEventListener
		// 3. first arg: what event
		// 4. second arg: code to run if event happens
		squares[i].addEventListener('click', function(event){
			// console.log(this); // The "this" is the "this" that got clicked on.
			// call the markSquare function and pass the square the user clicked on.
			// Only call markSquare if gameOver = false.
			// In JS, ! = not.
			if(!gameOver){
				markSquare(this);
			}
		})
	}
}
gameOn();


reset.addEventListener('click', resetByUser);
function resetByUser(event, winningCombo){
	var validUserReset = true;
	if(gameOver === false){
	var userReset = prompt("Are you sure you would like to reset the board ('y' or 'n')?");
	if(userReset === null){ // the user clicked 'Cancel'
		// console.log(userReset);
		return;
	}
	while (validUserReset){
		if(userReset == 'y'){
			whosTurn = 1;
			player1Squares = [];
			player2Squares = [];
			// console.log("reset player 1: " + player1Squares)
			// console.log("reset player 2: " + player2Squares)
			for (let i = 0; i < squares.length; i++){
				squares[i].innerHTML = "-";
			}
			validUserReset = false;
		}else if(userReset != 'n'){
			userReset = prompt("Please choose 'y' or 'n'.");
		}else{
			validUserReset = false;
		}
	}
	}
	else{
		whosTurn = 1;
		player1Squares = [];
		player2Squares = [];
		reset.innerHTML = 'Reset';
		for (let i = 0; i < squares.length; i++){
			squares[i].innerHTML = "-";
		}	
		var winningSquares = document.getElementsByClassName('winning-square');
		// console.log(winningSquares.length);
		for (let i = 0; i < winningSquares.length; i++){
			// console.log(winningSquares[i]);
			winningSquares[i].classList.remove('winning-square');
		}
	gameOver = false;
	// console.log("player 1 end: " + player1Squares);
	// console.log("player 2 end: " + player2Squares);
	gameOn();
	}
}	