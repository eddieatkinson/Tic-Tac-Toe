var playingBoard = "";
function fillBoard(sideLength){
	for (let i = 0; i < sideLength; i++){
		playingBoard += '<div class="board-row">';
		for (let j = 0; j < sideLength; j++){
			playingBoard +=`<button id="${j}${i}" class="square">-</button>`;
		}
		playingBoard += '</div>';
	}
	return playingBoard;
}
console.log(fillBoard(3));