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
	console.log("click",e.x,e.y);
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
	const X = e.x;
	const Y = e.y;
	for (let box of infoBoxes){
		//First check if clicked in a box
		//Then check if clicked on specific region (buttons, minimize button)
		
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
					
					button.execute();
					return;
				}
			}
		}
	}
	
	if (platFrame.creating){
		let roundX = e.x - (e.x % 5);
		let roundY = e.y - (e.y % 5);
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
			game.platformGroup.addPlatform(platFrame.create());
		}
	}
	

}

function drag(x1,y1,x2,y2){
	const xOffset = x2 - x1;
	const yOffset = y2 - y1;
	
	//Loop through boxes
	//Check if clicked on header
	//Move box
	for (let box of infoBoxes){
		
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
	if (platFrame.creating){
		if (!platFrame.corner1){
			drawCircle(e.x,e.y,3,"red",false);
		}
	}
}
