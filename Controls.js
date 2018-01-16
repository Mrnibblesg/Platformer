/**
 * @fileOverview This file contains the functions that deal with the controls
 */


/**
 * The one-time key press function
 */
function keyPressed(e){
	switch(e.keyCode){
		case 38:
		case 87:{
			let shiftPress = keysDown[16];
			game.player.jump(shiftPress);
			break;
		}
	}
}
/**
 * The repeating key press function
 */
function whileKeyPressed(){
	let player = game.player;
	if (keysDown[37] || keysDown[65]){
		//left
		player.xVel -= player.accel;
	}
	if (keysDown[39] || keysDown[68]){
		//right
		player.xVel += player.accel;
	}
	
	
	//Reset the isMoving boolean to re check if the player is actually moving.
	player.isMoving = false;
	if (keysDown[37] || keysDown[65] || keysDown[39] || keysDown[68]){
		player.isMoving = true;
	}
}
