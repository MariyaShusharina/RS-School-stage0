
const canvas = document.querySelection(".field");
const set = canvas.getContext("2d");
const cells = 20;

const cWidth = canvas.width;
const cHeight = canvas.height;

let snake;
let food;
let is GameOver = false;

drawGrid() {
	set.lineWidth = 1;
	set.strokeStyle = "#007755";
	//set.shadowBlur = 0; // (add if it will appear to be necessary)
	for (let i = 1; i < cells; i++) {
		let range = (cWidth / cells) * i;
		set.beginPath();
		set.moveTo(range, 0);
		set.lineTo(range, cHeight);
		set.stroke();

		set.beginPath();
		set.moveTo(0, range);
		set.lineTo(cWidth, range);
		set.stroke();

		set.closePath();
	}
}

function initialise() {
	drawGrid();
}

initialise();

