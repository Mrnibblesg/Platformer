"use strict";
function initializeObjects(){
	screen = {
		x: 0,
		y: 0,
		centerX: W/2,
		centerY: H/2,
		w: W,
		h: H,
		
		//For logistic function when calculating how much to move
		logistExpBase: 1995/2000,
		
		follow: function(object){
			let lowerBoundaryW = 5 * W / 11;
			let upperBoundaryW = 6 * W / 11;
			let lowerBoundaryH = 2 * H / 5;
			let upperBoundaryH = 3 * H / 5;
			
			//These must not have anything done to them.
			let objCenterX = object.getCenterX() || object.x;
			let objCenterY = object.getCenterY() || object.y;
			
			objCenterX += this.x;
			objCenterY += this.y;
			
			let centerDistX = Math.abs(objCenterX - W/2);
			let centerDistY = Math.abs(objCenterY - H/2);
			
			
			//850 is just an arbitrary number chosen as an offset number.
			let movePercentX = logistic(0.2,this.logistExpBase,centerDistX,850);
			let movePercentY = logistic(0.3,this.logistExpBase,centerDistY,850);
			
			if (objCenterX < lowerBoundaryW){
				this.x += movePercentX * centerDistX;
			}
			else if (objCenterX > upperBoundaryW){
				this.x -= movePercentX * centerDistX;
			}
			if (objCenterY < lowerBoundaryH){
				this.y += movePercentY * centerDistY;
			}
			
			//Effect magnified by 50%, because I want to be able to see what's underneath me when I'm falling.
			else if (objCenterY > upperBoundaryH){
				this.y -= (movePercentY * 1.5) * centerDistY;
			}
		}
	}

	game = {
		player: undefined,
		
		//Temporary until hub world is created
		background: undefined,
		platformGroup: undefined,
		//
		
		draw: function(){
			if (exists(this.background)){
				this.background.draw();
			}
			if (exists(this.player)){
				this.player.draw();
			}
			if (exists(this.platformGroup)){
				this.platformGroup.draw();
			}
		},
		
		//Try to find a better way to update stuff
		update: function(){
			if (exists(this.player)){
				let player = this.player;
				player.update();
				
				//Speed up by only checking nearby platforms
				//Make prettier, by possibly doing something better for getting the platforms.
				player.canJump = false;
				for (let platform of this.platformGroup.platforms){
					if (player.isColliding(platform)){
						player.rectCollide(platform);
					}
				}
			}
		}
	}
}
