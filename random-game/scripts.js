
const canvas = document.querySelector(".field");
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

function foodPosition() {
	let x = Math.floor(Math.random() * (cells - 1));
	let y = Math.floor(Math.random() * (cells - 1));
	//continue: exeption, where snake is
}

function randomColor() {
	let color = "";
	let hue = 185;

	hue = Math.floor(Math.random() * 360);

	color = "hsl(" + hue + ", 100%, 50%)";
}

function drawFood() {
	foodPosition();
	randomColor();
	let side = cWidth / cells;
	set.fillStyle = color;
	set.fillRect(x, y, side, side);
}

function initialise() {
	drawGrid();
	drawFood();
}

initialise();

