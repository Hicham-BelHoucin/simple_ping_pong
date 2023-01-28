const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const clearCanvas = () => {
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
};

const drawRect = (x, y, w, h) => {
	context.fillStyle = "black";
	context.fillRect(x, y, w, h);
};

const putText = (text, x, y) => {
	context.fillStyle = "black";
	context.font = "25px fantasy";
	context.fillText(text, x, y);
};

const drawBall = (x, y) => {
	context.fillStyle = "red";
	context.beginPath();
	context.arc(x, y, 15, 0, Math.PI * 2);
	context.closePath();
	context.fill();
};

// drawBall();
class user {
	constructor(x) {
		this.x = x;
		this.y = canvas.height / 2 - 50;
		this.score = 0;
		this.movespeed = 50;
	}
	moveup() {
		if (this.y > 0) this.y -= this.movespeed;
	}
	movedown() {
		if (this.y < canvas.height - 100) this.y += this.movespeed;
	}
	reset(x) {
		this.x = x;
		this.y = canvas.height / 2 - 50;
	}
}

const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 10,
	velocityX: 5,
	velocityY: 5,
	speed: 7,
	color: "WHITE",
	reset() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.radius = 10;
		this.velocityX = 5;
		this.velocityY = 5;
		this.speed = 7;
		this.color = "WHITE";
	},
};

const keys = {
	w: false,
	s: false,
	up: false,
	down: false,
	reset() {
		this.w = false;
		this.s = false;
		this.up = false;
		this.down = false;
	},
};

const player1 = new user(0);
const player2 = new user(canvas.width - 40);

const wallCol = (pointX, pointY, rectX, rectY, rectWidth, rectHeight) => {
	return (
		pointX >= rectX &&
		pointX <= rectX + rectWidth &&
		pointY >= rectY &&
		pointY <= rectY + rectHeight
	);
};

const renderGame = () => {
	clearCanvas();
	drawRect(player1.x, player1.y, 40, 100);
	putText(player1.score, canvas.width / 3, 25);
	for (let i = 0; i < canvas.height; ) {
		drawRect(canvas.width / 2 - 1, i, 2, 8);
		i += 12;
	}
	drawBall(ball.x, ball.y);
	drawRect(player2.x, player2.y, 40, 100);
	putText(player2.score, canvas.width - canvas.width / 3, 25);
};

const reset = () => {
	player1.reset(0);
	player2.reset(canvas.width - 40);
	ball.reset();
};

const update = () => {
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;

	// protection
	if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
		ball.velocityY = -ball.velocityY;
	else if (
		wallCol(ball.x + ball.radius, ball.y, player2.x, player2.y, 40, 100) ||
		wallCol(ball.x - ball.radius, ball.y, player1.x, player1.y, 40, 100)
	)
		ball.velocityX = -ball.velocityX;
	if (ball.x - ball.radius < 0) {
		// still need to check if any of the players have lost
		player2.score++;
		reset();
	} else if (ball.x + ball.radius > canvas.width) {
		player1.score++;
		reset();
	}

	// handle keys
	if (keys.w) player1.moveup();
	else if (keys.s) player1.movedown();
	if (keys.up) player2.moveup();
	else if (keys.down) player2.movedown();
	keys.reset();
};

document.addEventListener(
	"keydown",
	(event) => {
		var name = event.key;
		if (name === "w") keys.w = true;
		else if (name === "s") keys.s = true;
		if (name === "ArrowUp") keys.up = true;
		else if (name === "ArrowDown") keys.down = true;
	},
	false
);

setInterval(() => {
	renderGame();
	update();
}, 17);
