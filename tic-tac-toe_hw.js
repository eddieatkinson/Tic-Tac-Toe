var allWinningRows = [];
var allWinningColumns = [];
var allWinningDiags = [];
allWinningDiags[0] = [];
allWinningDiags[1] = [];
var sideLength = prompt("How many squares wide would you like?");
var numWaysToWin = (sideLength * 2) + 2
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
console.log(allWinningCombos);

function checkWin(currentPlayerSquares, playerNum){
	// OUTTER LOOP - check each winning combination
	for (let i = 0; i < allWinningCombos.length; i++){
		// Keep track of how many of THIS winning combo the player has.
		var squareCount = 0;
		// INNER LOOP - check a square inside a winning combination
		for (let j = 0; j < allWinningCombos[i].length; j++){
			var winningSquare = allWinningCombos[i][j];
			if(currentPlayerSquares.indexOf(winningSquare) !== -1){
				// The square belongs to the player. We do not care where.
				squareCount++;
			}
		} // end of j loop (row/diag/colum complete)
		// check to see if the squareCount === 3
		if(squareCount === 3){
			// Move stuff to a function.
			endGame(allWinningCombos[i], playerNum);
			break;
			
		}
	}
}