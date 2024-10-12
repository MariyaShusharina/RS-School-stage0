
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

const startBanner = document.querySelector(".start");
const resultBanner = document.querySelector(".result");

const maxScoreDisplay = document.querySelector(".max");
const maxScorePar = document.querySelector(".max-score");
const scorePar = document.querySelector(".score");

const yum = document.querySelector(".yum");
const endSound = document.querySelector(".end");
const song = document.querySelector(".song");


let lastGames = [];

for (let a = 0; a < 10; a++) {
	lastGames[a] = "0";
}

localStorage.setItem("lastGames", JSON.stringify(lastGames));

let bestGames = [];

for (let b = 0; b < 10; b++) {
	bestGames[b] = "0";
}

localStorage.setItem("bestGames", JSON.stringify(bestGames));

let recordsLast = JSON.parse(localStorage.lastGames);
let recordsBest = JSON.parse(localStorage.bestGames);

const records = document.querySelector(".records");
const recordsContent = document.querySelector(".records-show");

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

		set2.beginPath();
		set2.moveTo(0, range);
		set2.lineTo(cWidth, range);
		set2.stroke();
	}
}

function drawTexts() {
	texts.textContent = 'Score: ' + score;
	maxScoreDisplay.textContent = 'Max Score: ' + maxScore;
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

	teleport();

	let newHead = {
		x: snakeX,
		y: snakeY,
	};

	snake.unshift(newHead);

	drawSnake();
}

function teleport() {
	/*
	snakeX = snake[0].x;
	snakeY = snake[0].y;
	*/

	if (snakeX < 0) {
		snakeX = side * (cells - 1);
	}

	if (snakeX > (side * (cells - 1))) {
		snakeX = 0;
	}

	if (snakeY < 0) {
		snakeY = side * (cells - 1);
	}

	if (snakeY > (side * (cells - 1))) {
		snakeY = 0;
	}
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

			scorePar.textContent = "Your Score: " + score;

			// local storage for 10 LAST games

			lastGames.push(score);
			lastGames.shift();

			localStorage.lastGames = JSON.stringify(lastGames);

			//recordsLast = JSON.parse(localStorage.lastGames);



			if (score > maxScore) {

				maxScore = score;

				// local storage for 10 BEST games

				bestGames.push(maxScore);
				bestGames.sort(function(c, d){ return d - c });
				bestGames.pop();

				localStorage.bestGames = JSON.stringify(bestGames);
			}

			maxScorePar.textContent = "Maximum score: " + maxScore;

			//recordsBest = JSON.parse(localStorage.bestGames);

			resultBanner.style.visibility = "visible";
		}
	}
}

function showRecords() {

	recordsLast = JSON.parse(localStorage.lastGames);
	recordsBest = JSON.parse(localStorage.bestGames);

	records.style.visibility = "visible";

}

function showLast() {

	recordsContent.innerHTML = "";

	for (let s = 0; s < recordsLast.length; s++) {

		let par = document.createElement("p");
		par.textContent = recordsLast[s];
		recordsContent.appendChild(par);
	}	
}

function showBest() {

	recordsContent.innerHTML = "";
	
	for (let s = 0; s < recordsBest.length; s++) {

		let par = document.createElement("p");
		par.textContent = recordsBest[s];
		recordsContent.appendChild(par);
	}	
}

function back() {
	records.style.visibility = "hidden";
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

function initialise() {
	
	snake.length = 1;

	snake[0] = {
		x: side * 10,
		y: side * 10,
	};

	snakeX = 0;
	snakeY = 0;

	score = 0;

	drawGrid();
	drawSnake();
	drawFood();
	drawTexts();

	resultBanner.style.visibility = "hidden";
	startBanner.style.visibility = "hidden";
	
	refresh = setInterval(GAME, 100);

	move();

	song.muted = false;
	song.play();
}

