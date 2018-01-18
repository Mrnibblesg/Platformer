"use strict";
/**
 * @fileOverview This file initializes the entire game at the beginning
 */

/**
 *Initializes the game object and screen object
 */
function initialize(){
	
	
	//Initialize screen and game
	initializeObjects();
	
	
	//create player
	let newPlayer = new Player(W/2,H/2 - 50,20);
	game.player = newPlayer;
	
	
	
	
	//create background pattern shapes
	let pattern = [];
	pattern.push(new BackgroundShape("rect",[0,0,51,51],"black"));
	pattern.push(new BackgroundShape("rect",[5,5,40,40],"darkred"));
	
	//create background pattern with previous shapes
	let newBackgroundPattern = new BackgroundPattern(pattern,50,50);
	
	//create background with pattern
	let newBackground = new Background(newBackgroundPattern,50);
	game.background = newBackground;
	
	
	
	
	//Initialize platforms (testing platforms only, not permanent)
	let platforms = [];
	platforms.push(new Platform(500,500,100,50));
	platforms.push(new Platform(650,500,100));
	platforms.push(new Platform(725,475,100));
	platforms.push(new Platform(950,500,100));
	platforms.push(new Platform(300,550,500));
	let platGroup = new PlatformGroup(platforms);
	game.platformGroup = platGroup;
	
	
	
	
	requestAnimationFrame(gameLoop);
}
