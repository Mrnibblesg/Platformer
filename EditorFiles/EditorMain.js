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

let mouse = {};


let infoBoxes = [];

initializeObjects();

let newBox = new InfoBox(100,250,150,200,"Controls",[]);

newBox.lines.push("Move: WASD or");
newBox.lines.push("arrow keys");
newBox.lines.push("");
newBox.lines.push("Sample Text");

infoBoxes.push(newBox);

//'Create' info box
newBox = new InfoBox(300,250,300,200,"Create",[]);


newBox.buttons.push(new Button(10,30,110,20,"New platform",function(){
	platFrame.creating = true;
}));
newBox.buttons.push(new Button(140,30,60,20,"Cancel",function(){
	platFrame.reset();
}));

newBox.buttons.push(new Button(10,60,125,20,"Set spawnpoint",function(){
	console.log("spawn");
}));

infoBoxes.push(newBox);


//The loop
gameLoop();
function gameLoop(){
	c.clearRect(0,0,W,H);
	
	//Draw background grid
	drawGrid(25);
	
	
	
	//Draw mouse coordinates
	drawMouseInfo();
	
	
	whileKeyPressed();
	game.update();
	game.draw();
	
	//Draw info boxes
	for (let box of infoBoxes){
		box.draw();
	}
	
	
	platFrame.draw();
	requestAnimationFrame(gameLoop);
}
function drawMouseInfo(){
	let realX = mouse.x - screen.x;
	let realY = mouse.y - screen.y;
	
	drawRect(mouse.x + 15,mouse.y + 15,70,16,"silver","black",true);
	drawText(realX + ", " + realY, mouse.x + 17, mouse.y + 17, "12px Verdana", "start", "hanging", "black");
}

function createPlatFrame(e){
	//Round x and y down to the next multiple of 5
	
	let roundX = e.x - (e.x % 5);
	let roundY = e.y - (e.y % 5);
	if (!platFrame.creating){
		platFrame.creating = true;
		return;
	}
	if (!platFrame.corner1){
		platFrame.x1 = roundX;
		platFrame.y1 = roundY;
		platFrame.corner1 = true;
	}
	else if (!platFrame.corner2){
		platFrame.x2 = e.x;
		platFrame.y2 = e.y;
		platFrame.corner2 = true;
	}
	
}
