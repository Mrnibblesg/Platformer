"use strict";
function keyPressed(e){
	let player = game.player;
	
	
	if (exists(player)){
		switch(e.keyCode){
			case 38:
			case 87:{
				let shiftPress = keysDown[16];
				player.jump(shiftPress);
				break;
			}
		}
	}
	
	
}

/**
 * The repeating key press function
 */
function whileKeyPressed(){
	let player = game.player;
	
	if (exists(player)){
		//Player controls
		
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
	else{
		//Screen moving controls
		
		if (keysDown[37] || keysDown[65]){
			//left
			screen.x += 3;
		}
		if (keysDown[39] || keysDown[68]){
			//right
			screen.x -= 3;
		}
		if (keysDown[38] || keysDown[87]){
			//up
			screen.y += 3;
		}
		if (keysDown[40] || keysDown[83]){
			//down
			screen.y -= 3;
		}
	}
}
function click(e){
	
}