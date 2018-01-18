"use strict";
const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
const W = window.innerWidth;
const H = window.innerHeight;
let keysDown = [];
canvas.width = W;
canvas.height = H;

let screen = {};
let game = {};
initializeObjects();


addEventListener("keydown",function(e){
	keysDown[e.keyCode] = true;
	keyPressed(e);
});

addEventListener("keyup",function(e){
	delete keysDown[e.keyCode];
});

addEventListener("click",function(e){
	click(e);
	console.log("click",e.x,e.y);
});

addEventListener("mousemove",function(e){
	console.log("obama");
});



//The loop
gameLoop();
function gameLoop(){
	c.clearRect(0,0,W,H);
	drawGrid(25);
	textBox.draw();
	whileKeyPressed();
	game.update();
	game.draw();
	
	requestAnimationFrame(gameLoop);
}