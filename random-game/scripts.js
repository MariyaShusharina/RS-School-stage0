
let crs = "";

document.addEventListener("keydown", course);

document.addEventListener("keydown", prevention);


const fontAtari = new FontFace("Atari Classic", "url(./assets/AtariClassic-gry3.ttf)");
document.fonts.add(fontAtari);

const field = document.querySelector(".field");
const set = field.getContext("2d");

const bg = document.querySelector(".grids");
const set2 = bg.getContext("2d");

const texts = document.querySelector(".texts");

const cells = 20;

const cWidth = field.width;
const cHeight = field.height;

let side = cWidth / cells;

let snake = [];

snake[0] = {
	x: side * 10,
	y: side * 10,
};

let snakeX = 0;
let snakeY = 0;

let food = {
	x: side * (Math.floor(Math.random() * cells)),
	y: side * (Math.floor(Math.random() * cells)),
	
};

let score = 0;
let maxScore = 0;
let isGameOver = false;

let hue = 185;
let color = "hsl(" + hue + ", 100%, 50%)";

let lineColor = window.getComputedStyle(document.body).backgroundColor;
console.log("lineColor is " + lineColor);

const yum = document.querySelector(".yum");
const endSound = document.querySelector(".end");
const song = document.querySelector(".song");

/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async */

function prevention(event) {
	let k = event.keyCode;
	if (k >= 37 && k <= 40) { event.preventDefault(); }
}

function course(event) {
	if ((event.code === "ArrowUp") && (crs != "down")) {
		crs = "up";
		console.log(crs);
	} else if ((event.code === "ArrowLeft") && (crs != "right")) {
		crs = "left";
		console.log(crs);
	} else if ((event.code === "ArrowRight") && (crs != "left")) {
		crs = "right";
	} else if ((event.code === "ArrowDown") && (crs != "up")) {
		crs = "down";
	}
}

function drawGrid() {
	set2.lineWidth = 1;
	set2.strokeStyle = lineColor;

	for (let i = 1; i < cells; i++) {
		let range = side * i;
		set2.beginPath();
		set2.moveTo(range, 0);
		set2.lineTo(range, cHeight);
		set2.stroke();
		//await sleep(500);

		set2.beginPath();
		set2.moveTo(0, range);
		set2.lineTo(cWidth, range);
		set2.stroke();
		//await sleep(500);
	}
}

/*
function drawTexts() {
	setTxt.fillStyle = "#FFFFFF";
	setTxt.font = `30px "Atari Classic"`;
	setTxt.fillText("Score: ", side, 2 * side);
}
*/

function drawTexts() {
	texts.textContent = 'Score: ' + score;
}

function drawSnake() {
	for (let i = 0; i < snake.length; i++) {
		set.fillStyle = "#FFFFFF";
		set.shadowColor = "rgba(255, 255, 255, 0.5";
		set.shadowBlur = 20;
		set.fillRect(snake[i].x, snake[i].y, side, side);
	}
}

function drawFood() {
	foodPosition();
	randomColor();
	
	set.fillStyle = color;
	set.shadowColor = color;
	set.shadowBlur = 20;
	set.fillRect(food.x, food.y, side, side);
}

function reDrawFood() {
	set.fillStyle = color;
	set.shadowColor = color;
	set.shadowBlur = 20;
	set.fillRect(food.x, food.y, side, side);
}

function foodPosition() {
	food.x = side * (Math.floor(Math.random() * cells));
	food.y = side * (Math.floor(Math.random() * cells));

	for (let j = 0; j < snake.length; j++) {
		if ( (food.x == snake[j].x) || (food.y == snake[j].y) ) { foodPosition2(); }
	}
}

function foodPosition2() {
	food.x = side * (Math.floor(Math.random() * cells));
	food.y = side * (Math.floor(Math.random() * cells));

	for (let j = 0; j < snake.length; j++) {
		if ( !(!(food.x == snake[j].x) && !(food.y == snake[j].y)) ) { foodPosition(); }
	}
}

function randomColor() {
	hue = Math.floor(Math.random() * 360);
	color = "hsl(" + hue + ", 100%, 50%)";

	console.log("RandomColor is " + color);
}

function move() {
	snakeX = snake[0].x;
	snakeY = snake[0].y;
	
	eat();

	if (crs === "up") { snakeY -= side; }
	else if (crs === "down") { snakeY += side; }
	else if (crs === "left") { snakeX -= side; }
	else if (crs === "right") { snakeX += side; }

	let newHead = {
		x: snakeX,
		y: snakeY,
	};

	snake.unshift(newHead);

	drawSnake();
}

function eat() {
	if (snakeX === food.x && snakeY === food.y) {

		yum.play();

		score++;

		drawFood();

	} else {
		snake.pop();
	}
}

function gameOver() {
	for (let g = 1; g < snake.length; g++) {
		if ( (snake[0].x == snake[g].x) && (snake[0].y == snake[g].y) ) {

			clearInterval(refresh);

			endSound.play();

			song.pause();
			song.currentTime = 0;

			// continue...(EndGame banner and maxScore)
		}
	}
}



function initialise() {
	drawGrid();
	drawSnake();
	drawFood();
	drawTexts();
	move();

	song.muted = false;
	song.play();
}

function GAME() {
	set.clearRect(0, 0, 500, 500);
	drawSnake();
	reDrawFood();
	move();
	drawTexts();
	gameOver();
}

let refresh = setInterval(GAME, 100);

initialise();

