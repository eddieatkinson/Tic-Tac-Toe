var playingBoard = "";

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
console.log(fillBoard(3)); 