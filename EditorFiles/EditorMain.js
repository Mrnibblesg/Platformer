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

initializeObjects();



let newBox = new InfoBox(0,0,150,200,"Controls",[]);
newBox.lines = [
"Move: WASD",
"",
"Sample Text"
];
editor.infoBoxes.push(newBox);




//'Create' info box
newBox = new InfoBox(150,0,300,200,"Create",[]);
newBox.buttons.push(new Button(10,30,110,20,"New platform","rgb(60,170,220)","normal",
function(){
	editor.platFrame.creating = true;
}));

newBox.buttons.push(new Button(140,30,60,20,"Cancel","red","normal",
function(){
	editor.infoBoxes[1].uncheckBoxes();
	editor.platFrame.reset();
	editor.spawnFrame.reset();
}));

newBox.buttons.push(new Button(10,60,125,20,"Set spawnpoint","rgb(60,170,220)","normal",
function(){
	editor.spawnFrame.creating = true;
}));

newBox.buttons.push(new Button(160,60,20,20,"Keep creating","transparent","check",
function(){
	editor.keepCreating = true;
},
function(){
	editor.keepCreating = false;
}))

newBox.buttons.push(new Button(10,130,110,20,"Set grid snap","rgb(60,170,220)","normal",
function(){
	let newGridSnap = +prompt("What will the new grid snap amount be? Current: " + editor.gridSnap + " pixels");
	
	if (isNaN(newGridSnap) || newGridSnap === 0){
		alert("That's not a valid number.");
	}
	else{
		editor.gridSnap = newGridSnap;
	}
}))

editor.infoBoxes.push(newBox);




//"Test" info box
newBox = new InfoBox(450,0,150,150,"Test",[]);

newBox.buttons.push(new Button(10,30,60,20,"Spawn","green","normal",
function(){
	//Spawn player
	screen.saveX = screen.x;
	screen.saveY = screen.y;
	game.spawnPlayer();
}));
newBox.buttons.push(new Button(80,30,60,20,"Stop","red","normal",
function(){
	//Despawn player and return screen to original position
	game.player = undefined;
	if (screen.saveX && screen.saveY){
		screen.x = screen.saveX;
		screen.y = screen.saveY;
	}
	
}));

editor.infoBoxes.push(newBox);




//"Levels" info box
newBox = new InfoBox(600,0,150,150,"Levels",[]);

newBox.buttons.push(new Button(10,30,100,20,"Save level","Green","normal",
function(){
	//save level
	editor.savedLevelData.push(editor.levelDataFrame.create());
}));
newBox.buttons.push(new Button(10,60,100,20,"Load level","rgb(60,170,220)","normal",
function(){
	let levelToLoad = +prompt("Please enter what level you would like to load. There are " + editor.savedLevelData.length + " saved levels.");
	
	if (levelToLoad < 1 || levelToLoad > editor.savedLevelData.length){
		alert("That is not a valid choice.");
	}
	else{
		//load level
		editor.levelDataFrame.load(editor.savedLevelData[levelToLoad - 1]);
	}
}));
editor.infoBoxes.push(newBox);



//The loop
gameLoop();
function gameLoop(){
	c.clearRect(0,0,W,H);
	
	//Draw background grid
	drawGrid(25);
	
	
	//Draw mouse coordinates
	drawMouseInfo();
	game.currentLevel = new Level(editor.levelDataFrame.create());
	
	//Handles key presses
	whileKeyPressed();
	
	
	game.update();
	game.draw();
	
	if (exists(game.player)){
		game.player.draw();
		screen.follow(game.player);
	}
	
	
	//Draw info boxes
	for (let box of editor.infoBoxes){
		box.draw();
	}
	
	
	editor.platFrame.draw();
	editor.spawnFrame.draw();
	if (exists(game.spawn)){
		game.spawn.draw();
	}
	
	checkInfoBoxes();
	
	requestAnimationFrame(gameLoop);
}
function drawMouseInfo(){
	let realX = Math.round(mouse.x - screen.x);
	let realY = Math.round(mouse.y - screen.y);
	
	drawRect(mouse.x + 15,mouse.y + 15,70,16,"silver","black",true);
	drawText(realX + ", " + realY, mouse.x + 17, mouse.y + 17, "12px Verdana", "start", "hanging", "black");
}
function checkInfoBoxes(){
	let anyHighlights = false;
	let platforms = editor.levelDataFrame.platformGroup.platforms;
	
	for (let platform of platforms){
		if (platform.highlighted){
			anyHighlights = true;
			break;
		}
	}
}

//Create code function
function createCode(){
	
}
