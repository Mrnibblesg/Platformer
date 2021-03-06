"use strict";
/**
 * @fileOverview All of the constructors used in the game.
 * @author Parker Gutierrez
 */

/**
* This is the player that you control when playing the game.
* @property {number} x - The x coordinate of the player.
* @property {number} y - The y coordinate of the player.
* @property {number} w - The width of the player.
* @property {number} h - The height of the player.
*
* @property {number} prevX - The previous x location of the player.
* @property {number} prevY - The previous y location of the player.
*
* @property {number} xVel - The x velocity of the player.
* @property {number} maxXVel - The maximum x velocity of the player in either direction.
*
* @property {number} yVel - The y velocity of the player.
* @property {number} maxYVel - The maximum y velocity of the player going down.
*
* @property {number} accel - The acceleration of the player when they move on the ground.
* @property {number} grav - The gravity the player experiences.
*
* @property {string} col - The color of the player.
* @property {string} stroke - The stroke color of the player. 
*
* @property {boolean} isMoving - True if any movement keys are being held down (excluding jumping), false otherwise.
* @property {Function} draw - Calls the drawRect function to draw the player.
* @property {Function} update - Updates the player's information, including position.
* @property {Function} isColliding - Returns true if the player is colliding with given rect.
* @property {Function} rectCollide - Deals with player-rect collisions
* @property {Function} jump - Makes the player jump
* @property {Function} getCenterX - Returns the player's center x coordinate, not accounting for the screen's x value.
* @property {Function} getCenterY - Returns the player's center y coordinate, not accounting for the screen's y value.
* @constructor
*/
function Player(x = W/2,y = H/2,s){
	this.x = x;
	this.y = y;
	this.w = s;
	this.h = s;
	
	this.prevX = x;
	this.prevY = y;
	
	this.xVel = 0;
	this.maxXVel = 7;
	
	this.yVel = 0;
	this.maxYVel = this.h - 0.5;
	
	this.accel = 3;
	this.grav = 0.75;
	
	this.col = "red";
	this.stroke = "white";
	
	this.isMoving = false;
	this.canJump = true;
	
	this.draw = function(){
		drawRect(this.x, this.y, this.w, this.h, this.col, this.stroke);
	}
	
	this.update = function(){
		
		
		//
		//Player Movement
		
		//Move prevX and prevY to x and y before they change.
		this.prevX = this.x;
		this.prevY = this.y;
		
		
		//Update x and y locations and speeds
		this.yVel += this.grav;
		
		
		//Throttle y speeds
		if (this.yVel > this.maxYVel){
			this.yVel = this.maxYVel;
		}
		this.y += this.yVel;
		
		//Throttle x speeds
		if (this.xVel > this.maxXVel){
			this.xVel = this.maxXVel;
		}
		else if (this.xVel < -this.maxXVel){
			this.xVel = -this.maxXVel;
		}
		
		this.x += this.xVel;
		
		if (!this.isMoving){
			this.xVel *= 0.7;
		}
		
		//Stop x momentum if it is really small.
		if (Math.abs(this.xVel) < 0.1){
			this.xVel = 0;
		}
		
		//End Player Movement
		//
	}
	
	this.isColliding = function(rect){
		if (this.x < rect.x + rect.w &&
		  this.x + this.w > rect.x &&
		  this.y < rect.y + rect.h &&
		  this.y + this.h > rect.y){
			return true;
		}
		return false;
	}
	
	
	this.rectCollide = function(plat){
		this.canJump = false;
		
		//Top collision
		if (this.prevY < plat.y &&
		  this.prevX + this.w > plat.x &&
		  this.prevX < plat.x + plat.w){
			this.y = plat.y - this.h;
			this.yVel = 0;
			this.canJump = true;
		}
		//Bottom collision
		else if(this.prevY > plat.y + plat.h &&
		  this.prevX + this.w > plat.x &&
		  this.prevX < plat.x + plat.w){
			this.y = plat.y + plat.h;
			this.yVel = 0;
		}
		//Left collision
		else if (this.prevX < plat.x &&
		  this.prevY + this.h > plat.y &&
		  this.prevY < plat.y + plat.h){
			this.x = plat.x - this.w;
			this.xVel = 0;
		}
		//Right collision
		else if(this.prevX + this.w > plat.x + plat.w &&
		  this.prevY + this.h > plat.y &&
		  this.prevY < plat.y + plat.h){
			this.x = plat.x + plat.w;
			this.xVel = 0;
		}
	}
	
	
	this.jump = function(shift){
		if (this.canJump){
			if (shift){
				this.yVel = -10;
			}
			else{
				this.yVel = -15;
			}
			this.canJump = false;
		}
	}
	
	this.getCenterX = function(){
		return this.x + this.w / 2;
	}
	this.getCenterY = function(){
		return this.y + this.h / 2;
	}
}


/**
 * The platform object, the one the player can interact with.
 * @property {number} x - The x coordinate of the platform.
 * @property {number} y - The y coordinate of the platform.
 * @property {number} w - The width of the platform.
 * @property {number} h - The height of the platform.
 * 
 * @property {string} col - The color of the platform.
 * @property {string} stroke - The stroke color of the platform.
 *
 * @property {Function} draw - Calls the drawRect function to draw the platform.
 * @constructor
*/
function Platform(x, y, w, h = w / 2){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.col = "black";
	this.stroke = "white";
	
	this.highlighted = false;
	
	this.draw = function(){
		drawRect(this.x,this.y,this.w,this.h,this.col,this.stroke);
		if (this.highlighted){
			drawRect(this.x,this.y,this.w,this.h,"rgba(0,255,0,0.3)",this.stroke);
		}
	}
	
	this.toggleHighlight = function(){
		this.highlighted = !this.highlighted;
	}
}

/**
 * This is the background. It is made of a pattern that draws the pattern it's made of repeatedly.
 * @property {BackgroundPattern} pattern - The pattern that the background is composed of.
 * @property {number} movePercentage - The amount that the background moves relative to the foreground.
 * @property {Function} draw - Draws the background; Repeatedly draws the pattern however many times it needs to to fill the screen.
 * @constructor
*/
function Background(pattern = new BackgroundPattern(), movePercentage = 50){
	this.pattern = pattern;
	this.movePercentage = movePercentage / 100;
	
	this.draw = function(){
		
		let patternW = this.pattern.w;
		let patternH = this.pattern.h;
		
		let maxFitW = Math.ceil(W / patternW);
		let maxFitH = Math.ceil(H / patternH);
		
		let offsetX = screen.x * this.movePercentage % patternW;
		let offsetY = screen.y * this.movePercentage % patternH;
		
		for (let i = -1; i < maxFitW + 1; i++){
			for (let j = -1; j < maxFitH + 1; j++){
				this.pattern.draw((i * patternW) + offsetX, (j * patternH) + offsetY);
			}
		}
	}
}
/**
 * A group of background shapes, which can be drawn in the same configuration wherever it is drawn.
 * @property {Array.<BackgroundShape, number>} shapes - An array of BackgroundShape objects<br>
 * with corresponding x and y values relative to the top right corner of the pattern.
 * @property {number} w - Width of the pattern
 * @property {number} h - Height of the pattern
 * @property {Function} draw - Draws each background shape contained inside of itself at the given x and y values.
 * @constructor
 */
function BackgroundPattern(shapes = [],w = 100,h = 100){
	this.shapes = shapes;
	this.w = w;
	this.h = h;
	
	this.draw = function(x = 0,y = 0){
		for (let shape of this.shapes){
			shape.draw(x,y);
		}
	}
}

/**
 * A shape, to be used in a background pattern.
 * @property {string} type - The type of shape.
 * @property {Array.<number>} info - The information for the shape,<br>
 * which differs depending on the type.<br>
 * For "rect", it's x, y, width, height.
 * @property {string} col - The color of the shape.
 * @property {Function} draw - Draws the shape relative to the given x and y parameters.
 * @constructor
 */
function BackgroundShape(type = "none", info = [], col = "black"){
	this.type = type;
	this.info = info;
	this.col = col;
	
	/**
	 * Draws the background, starting at the provided x and y values
	 * @param {number} x - The starting x value
	 * @param {number} y - The starting y value
	 */
	this.draw = function(startX, startY){
		if (this.type === "rect"){
			let x = this.info[0];
			let y = this.info[1];
			let w = this.info[2];
			let h = this.info[3];
			
			let totalX = x + startX;
			let totalY = y + startY;
			
			drawRect(totalX,totalY,w,h,this.col,transparent,true);
		}
	}
}
/**
 * Contains levels of the same style/theme
 */
function Sector(levels = []){
	this.levels = levels;
	
	this.addLevel = function(newLevel){
		this.levels.push(newLevel);
	};
}

/**
 * Ties all of the level information together.
 */
function Level(data = new LevelData(),style = new LevelStyle()){
	this.data = data;
	this.style = style;
	
	this.spawnPlayer = function(){
		let spawnX = this.data.spawnpoint.x;
		let spawnY = this.data.spawnpoint.y;
		game.player = new Player(spawnX,spawnY,20,20);
	}
	this.draw = function(){
		this.data.draw();
	}
	this.getPlatforms = function(){
		return this.data.platformGroup.platforms;
	}
}

/**
 * Will contain information like textures for particular types of objects
 */
function LevelStyle(){
	
}

/**
 * Contains the level data, such as the platforms, spawnpoint, and backgrounds.
 */
function LevelData(platformGroup, spawnpoint, backgrounds){
	this.platformGroup = platformGroup || new PlatformGroup();
	this.spawnpoint = spawnpoint || new Spawnpoint(0,0);
	this.backgrounds = backgrounds || [new Background()];
	
	this.draw = function(){
		for (let background of this.backgrounds){
			background.draw();
		}
		this.platformGroup.draw();
		this.spawnpoint.draw();
	}
}


/**
 * Contains platforms in a particular group.
 */
function PlatformGroup(platforms){
	this.platforms = platforms || [];
	
	this.draw = function(){
		for (let platform of this.platforms){
			platform.draw();
		}
	}
	
	this.addPlatform = function(platform){
		this.platforms.push(platform);
	}
	this.removePlatform = function(index){
		this.platforms.splice(index,1);
	}
	this.getPlatform = function(index){
		return this.platforms[index];
	}
}

/**
 * The spawnpoint
 */
function Spawnpoint(x,y){
	this.x = x;
	this.y = y;
	
	this.draw = function(){
		drawRect(this.x,this.y,20,20,"rgba(255,0,0,0.5)","rgba(0,0,0,0.5)");
	}
}
