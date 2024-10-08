
const fontAtari = new FontFace("Atari Classic", "url(./assets/AtariClassic-gry3.ttf)");
document.fonts.add(fontAtari);

const field = document.querySelector(".field");
const set = field.getContext("2d");

const texts = document.querySelector(".texts");
const setTxt = texts.getContext("2d");

const cells = 20;

const cWidth = field.width;
const cHeight = field.height;

let side = cWidth / cells;
let x = 0;
let y = 0;

let snake = [];

snake[0] = {
	x: side * 10,
	y: side * 10,
};

let food = {
	x: side * (Math.floor(Math.random() * (cells - 1))),
	y: side * (Math.floor(Math.random() * (cells - 1))),
	
};

let score = 0;
let maxScore = 0;
let isGameOver = false;

let hue = 185;
let color = "hsl(" + hue + ", 100%, 50%)";

let lineColor = window.getComputedStyle(document.body).backgroundColor;
console.log("lineColor is " + lineColor);

/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async */
function drawGrid() {
	set.lineWidth = 1;
	set.strokeStyle = lineColor;

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

fontAtari.load().then(drawTexts());

function drawTexts() {
	setTxt.fillStyle = "#FFFFFF";
	setTxt.font = `50px "Atari Classic"`;
	setTxt.fillText("Score: ", side, 2.2 * side);
}

function drawSnake() {
	for (let i = 0; i < snake.length; i++) {
		set.fillStyle = "#FFFFFF";
		set.fillRect(snake[i].x, snake[i].y, side, side);
	}
}

function drawFood() {
	foodPosition();
	randomColor();
	
	set.fillStyle = color;
	set.fillRect(x, y, side, side);
}

function foodPosition() {
	x = side * (Math.floor(Math.random() * (cells - 1)));
	y = side * (Math.floor(Math.random() * (cells - 1)));
	//continue: exeption, where snake is
}

function randomColor() {
	hue = Math.floor(Math.random() * 360);
	color = "hsl(" + hue + ", 100%, 50%)";

	console.log("RandomColor is " + color);
}


function initialise() {
	drawGrid();
	drawTexts()
	drawSnake();
	drawFood();
}

initialise();

