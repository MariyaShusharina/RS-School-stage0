
const canvas = document.querySelector(".field");
const set = canvas.getContext("2d");
const cells = 20;

const cWidth = canvas.width;
const cHeight = canvas.height;

let side = cWidth / cells;

let snake {
	x: 0,
	y: 0,

};

let food {
	x: 0,
	y: 0,
	
};

let score = 0;
let maxScore = 0;
let isGameOver = false;

let hue = 185;
let color = "hsl(" + hue + ", 100%, 50%)";

const lineColor = document.querySelector("body").style.backgroundColor;
console.log("lineColor is " + lineColor);

/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async */
function drawGrid() {
	set.lineWidth = 1;
	set.strokeStyle = lineColor;
	//set.shadowBlur = 0; // (add if it will appear to be necessary)
	for (let i = 1; i < cells; i++) {
		let range = side * i;
		set.beginPath();
		set.moveTo(range, 0);
		set.lineTo(range, cHeight);
		set.stroke();
		//await sleep(500);

		set.beginPath();
		set.moveTo(0, range);
		set.lineTo(cWidth, range);
		set.stroke();
		//await sleep(500);
	}
}

function drawFood() {
	foodPosition();
	randomColor();
	
	set.fillStyle = color;
	set.fillRect(x, y, side, side);
}

function foodPosition() {
	let x = side * (Math.floor(Math.random() * (cells - 1)));
	let y = side * (Math.floor(Math.random() * (cells - 1)));
	//continue: exeption, where snake is
}

function randomColor() {
	hue = Math.floor(Math.random() * 360);
	color = "hsl(" + hue + ", 100%, 50%)";

	console.log("RandomColor is " + color);
}


function initialise() {
	drawGrid();
	drawFood();
}

initialise();

