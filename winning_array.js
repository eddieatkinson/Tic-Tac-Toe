var allWinningRows = [];
var allWinningColumns = [];
var allWinningDiags = [];
allWinningDiags[0] = [];
allWinningDiags[1] = [];
var sideLength = 8; // prompt("How many squares wide would you like?");
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
	for (let i = 0; i < winningCombos.length; i++){
		var squareCount = 0;
		for (let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			if(currentPlayerSquares.indexOf(winningSquare) !== -1){
				squareCount++;
			}
		} 
		if(squareCount === sideLength){
			endGame(winningCombos[i], playerNum);
			break;
			
		}
	}
}