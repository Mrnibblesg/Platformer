const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");
const W = window.innerWidth;
const H = window.innerHeight;
let keysDown = [];
canvas.width = W;
canvas.height = H;

let game = {};

addEventListener("keydown",function(e){
	keysDown[e.keyCode] = true;
	keyPressed(e);
});
addEventListener("keyup",function(e){
	delete keysDown[e.keyCode];
});


let globalX = 0;
let globalY = 0;

initialize();

function gameLoop(){
	c.clearRect(0,0,W,H);
	whileKeyPressed();
	game.draw();
	game.update();
	requestAnimationFrame(gameLoop);
}
