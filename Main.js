"use strict";
/**
 * @fileOverview The file is the main runner that deals with all of the game logic.
 */

const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
const W = window.innerWidth;
const H = window.innerHeight;
let keysDown = [];
canvas.width = W;
canvas.height = H;

let screen = {};
let game = {};

addEventListener("keydown",function(e){
	keysDown[e.keyCode] = true;
	keyPressed(e);
});
addEventListener("keyup",function(e){
	delete keysDown[e.keyCode];
});

initialize();

function gameLoop(){
	c.clearRect(0,0,W,H);
	whileKeyPressed();
	game.draw();
	game.update();
	screen.follow(game.player);
	requestAnimationFrame(gameLoop);
}
