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
for (let i = 0; i < sideLength; i++){
	var oCount = 0;
	var xCount = 0;
	var emptyCount = 0;
	var availableSpace;
	for (let j = 0; j < sideLength; j++){
		if(document.getElementById(allWinningCombos[i][j]).innerHTML = '-'){
			emptyCount++;
			availableSpace = allWinningCombos[i][j];
		}else if(document.getElementById(allWinningCombos[i][j]).innerHTML = 'O'){
			oCount++;
		}else{
			xCount++;
		}
	}
	if(oCount + emptyCount == sideLength){
			markSquare(document.getElementById(availableSpace));
		}
}