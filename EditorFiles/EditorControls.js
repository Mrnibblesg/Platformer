"use strict";

addEventListener("keydown",function(e){
	keysDown[e.keyCode] = true;
	keyPressed(e);
});

addEventListener("keyup",function(e){
	delete keysDown[e.keyCode];
});

addEventListener("click",function(e){
	click(e);
});

addEventListener("mousemove",function(e){
	mouse.x = e.x;
	mouse.y = e.y;
	mouseMove(e);
});

addEventListener("mousedown",function(e){
	mouse.down = true;
	mouse.startDragX = e.x;
	mouse.startDragY = e.y;
});

addEventListener("mouseup",function(e){
	mouse.down = false;
	if (mouse.startDragX != e.x && 
		mouse.startDragY != e.y){
		
		drag(mouse.startDragX, mouse.startDragY, e.x, e.y);
	}
});



function keyPressed(e){
	let player = game.player;
	let platforms = editor.levelDataFrame.platformGroup.platforms;
	
	
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
	//loop through selected platforms
	for (let i = 0; i < platforms.length; i++){
		let platform = platforms[i];
		
		if (platform.highlighted){
			switch(e.keyCode){
				
				//Backspace
				case 8:{
					platforms.splice(i,1);
					i--;
					break;
				}
				
				//left, up, right, down
				case 37:{
					//move platform left
					platform.x -= editor.moveAmount;
					break;
				}
				case 38:{
					//move platform right
					platform.y -= editor.moveAmount;
					break;
				}
				case 39:{
					//move platform up
					platform.x += editor.moveAmount;
					break;

				}
				case 40:{
					//move platform down
					platform.y += editor.moveAmount;
					break;
				}
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
		const MOVE_SPEED = 5;
		//Screen moving controls
		
		if (keysDown[65]){
			//left
			screen.x += MOVE_SPEED;
		}
		if (keysDown[68]){
			//right
			screen.x -= MOVE_SPEED;
		}
		if (keysDown[87]){
			//up
			screen.y += MOVE_SPEED;
		}
		if (keysDown[83]){
			//down
			screen.y -= MOVE_SPEED;
		}
	}
}
function click(e){
	const X = e.x;
	const Y = e.y;
	let platforms = editor.levelDataFrame.platformGroup.platforms;
	
	for (let i = editor.infoBoxes.length - 1; i > -1; i--){
		let box = editor.infoBoxes[i];
		//First check if clicked in a box
		//Then check if clicked on specific region (buttons, minimize button)
		
		if (!box.shown){
			continue;
		}
		
		
		//Clicked in box
		if (X > box.x && X < box.x + box.w &&
		Y > box.y && Y < box.y + box.h){
			
			
			//Minimize/maximize button
			if (X < box.x + 20 && Y < box.y + 20){
				box.toggleSize();
				return;
			}
			
			//Skip button check if the box is mini
			if (box.minimized){
				continue;
			}
			
			for (let button of box.buttons){
				const buttonX = box.x + button.relX;
				const buttonY = box.y + button.relY;
				const buttonW = button.w;
				const buttonH = button.h;
				
				if (X > buttonX && X < buttonX + buttonW &&
				Y > buttonY && Y < buttonY + buttonH){
					
					if (button.type === "check"){
						button.check();
					}
					else{
						button.execute();
					}
					
					return;
				}
			}
		}
	}
	//Platform selection
	for (let platform of platforms){
		if (pointInsideRect(X,Y,platform,true) && editor.selectMode){
			platform.toggleHighlight();
		}
	}
	
	
	
	
	
	let roundX = X - (X % editor.gridSnap);
	let roundY = Y - (Y % editor.gridSnap);
	let platFrame = editor.platFrame;
	let spawnFrame = editor.spawnFrame;
	let levelDataFrame = editor.levelDataFrame;
	
	//Platform creation
	if (platFrame.creating){
		if (!platFrame.corner1){
			platFrame.corner1 = true;
			platFrame.x1 = roundX - screen.x;
			platFrame.y1 = roundY - screen.y;
		}
		else if (!platFrame.corner2){
			platFrame.corner2 = true;
			platFrame.x2 = roundX - screen.x;
			platFrame.y2 = roundY - screen.y;
		}
		else{
			levelDataFrame.platformGroup.addPlatform(platFrame.create());
		}
	}
	
	//Spawnpoint creation
	else if (spawnFrame.creating){
		if (!spawnFrame.isPlaced){
			spawnFrame.midX = roundX - screen.x;
			spawnFrame.midY = roundY - screen.y;
			spawnFrame.isPlaced = true;
		}
		else{
			levelDataFrame.spawnpoint = spawnFrame.create();
		}
	}
}

function drag(x1,y1,x2,y2){
	const xOffset = x2 - x1;
	const yOffset = y2 - y1;
	
	//Loop through boxes
	//Check if clicked on header
	//Move box
	for (let i = editor.infoBoxes.length - 1; i > -1; i--){
		let box = editor.infoBoxes[i];
		//Dimensions of the box header.
		const boxX = box.x;
		const boxY = box.y;
		const boxW = box.w;
		const boxH = box.h;
		
		if (x1 > boxX && x1 < boxX + boxW &&
		y1 > boxY && y1 < boxY + boxH){
			
			box.x += xOffset;
			box.y += yOffset;
			return;
		}
	}
}
function mouseMove(e){
	
}
