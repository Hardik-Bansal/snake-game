let cvs = document.getElementById('snake');
let ctx = cvs.getContext('2d')

//avg box size
let box = 32;

// ground and food image
let groundImage = new Image();
let foodImage = new Image();
let gameOver = new Image();
groundImage.src = 'img/ground.png';
foodImage.src = 'img/food.png';
gameOver.src = 'img/gameOver.png';

//audio files
const dead = new Audio();
dead.src = 'audio/dead.mp3';
const eat = new Audio();
eat.src = 'audio/eat.mp3';
const right = new Audio();
right.src = 'audio/right.mp3';
const left = new Audio();
left.src = 'audio/left.mp3';
const up = new Audio();
up.src = 'audio/up.mp3';
const down = new Audio();
down.src = 'audio/down.mp3';

//snake creation
let snake = [];
snake[0] = {
	x: box * 9,
	y: box * 10
}

//create food
let food = {
	x: Math.floor(Math.random() * 17 + 1) * box,
	y: Math.floor(Math.random() * 15 + 3) * box
}

//score
let score = localStorage.getItem('scoreBoard') 
	? parseInt(localStorage.getItem('scoreBoard'))
	: 0;

//control section
let d;
function direction(e){
	if(e.keyCode == 37 && d != 'RIGHT'){
		left.play();
		d = 'LEFT';
	}
	else if(e.keyCode == 38 && d != 'DOWN'){
		left.play();
		d = 'UP';
	}
	else if(e.keyCode == 39 && d != 'LEFT'){
		left.play();
		d = 'RIGHT';
	}
	else if(e.keyCode == 40 && d != 'UP'){
		left.play();
		d = 'DOWN';
	}
}
document.addEventListener('keydown', direction);

//check collision function
function collision(head, array){
	for(let i=0; i < array.length; i++){
		if(array[i].x == head.x && array[i].y == head.y){
			return true;
		}
	}
	return false;
}

//let's draw
function draw(){
	ctx.drawImage(groundImage, 0, 0);

	for(let i=0; i < snake.length; i++){
		ctx.fillStyle = (i == 0)? 'green': 'white';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = 'red';
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}
	ctx.drawImage(foodImage, food.x, food.y);

	//old head
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// remove tail
	// snake.pop();

	//which direction 
	if(d == 'LEFT') snakeX -= box;
	if(d == 'RIGHT') snakeX += box;
	if(d == 'UP') snakeY -= box;
	if(d == 'DOWN') snakeY += box;

	//score counter
	if(snakeX == food.x && snakeY == food.y){
		score++;
		//localStorage.setItem('scoreBoard', `${score}`)
		eat.play();
		food = {
			x: Math.floor(Math.random() * 17 + 1) * box,
			y: Math.floor(Math.random() * 15 + 3) * box
		}
	}	
	else{
		snake.pop();
	}

	//new head
	let newHead = {
		x: snakeX,
		y: snakeY
	}

	//game over rules
	if(snakeX < box || snakeY < 3 * box || snakeX > box * 17 || snakeY > 17 * box || collision(newHead, snake)){
		ctx.drawImage(gameOver, box * 5, box * 7);
		dead.play();
		clearInterval(game);
	}

	snake.unshift(newHead);

	ctx.fillStyle = 'white';
	ctx.font = '45px changa one';
	ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);

//local storage feature
/*let button = document.createElement('button');
button.textContent = 'Clear All';
document.body.appendChild(button);
button.setAttribute('style', `position: absolute;
	left: 400px;
	top: 25px;
	width: 150px;
	height: 35px;
	font-size: 1.5em;
	background: lightgreen;
	color: green;
	border: 1px solid red;`);

button.addEventListener('click', function (){
	localStorage.clear();
});*/


//start again feature
let button2 = document.createElement('button');
button2.textContent = 'Start Again';
document.body.appendChild(button2);
button2.setAttribute('style', `position: absolute;
	left: 200px;
	top: 25px;
	width: 150px;
	height: 35px;
	font-size: 1.5em;
	background: lightgreen;
	color: green;
	border: 1px solid red;`);
button2.addEventListener('click', draw);
