/**
* This is the player
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
	
	this.fill = "red";
	this.stroke = "white";
	
	this.isMoving = false;
	
	this.draw = function(){
		c.beginPath();
		c.fillStyle = this.fill;
		c.strokeStyle = this.stroke;
		c.rect(this.x,this.y,this.w,this.h);
		c.stroke();
		c.fill();
		c.closePath();
	}
	
	
	/**
	* Update the player
	*/
	this.update = function(){
		
		
		updateMovement(this);
		
		function updateMovement(player){
			//Move prevX and prevY to x and y before they change.
			player.prevX = player.x;
			player.prevY = player.y;
			
			
			//Update x and y locations and speeds
			player.yVel += player.grav;
			
			
			//Throttle y speeds
			if (player.yVel > player.maxYVel){
				player.yVel = player.maxYVel;
			}
			player.y += player.yVel;
			
			//Throttle x speeds
			if (player.xVel > player.maxXVel){
				player.xVel = player.maxXVel;
			}
			else if (player.xVel < -player.maxXVel){
				player.xVel = -player.maxXVel;
			}
			
			player.x += player.xVel;
			
			if (!player.isMoving){
				player.xVel *= 0.65;
			}
			
			//Stop x momentum if it is really small.
			if (Math.abs(player.xVel) < 0.1){
				player.xVel = 0;
			}
			
		}
	}
	
	/**
	* Check if the player is colliding with a rectangle.
	* @param {Object} rect the rectangle you're checking collisions with
	*/
	this.isColliding = function(rect){
		if (this.x < rect.x + rect.w &&
		  this.x + this.w > rect.x &&
		  this.y < rect.y + rect.h &&
		  this.y + this.h > rect.y){
			console.log(rect);
			return true;
		}
		return false;
	}
	
	
	this.rectCollide = function(plat){
		//Top collision
		if (this.prevY < plat.y &&
		  this.prevX + this.w > plat.x &&
		  this.prevX < plat.x + plat.w){
			this.y = plat.y - this.h;
			this.yVel = 0;
		}
		//Bottom collision
		else if(this.prevY > plat.y + plat.h &&
		  this.prevX + this.w > plat.x &&
		  this.prevX < plat.x + plat.w){
			this.y = plat.y + plat.h;
			this.yVel = 0;
		}
		//Left collision
		if (this.prevX < plat.x &&
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
	
	
	this.jump = function(){
		this.yVel = -15;
	}
}


/**
 *The platform object, the one the player can Numbereract with.
 *@param {Number} x The x location
 *@param {Number} y The y location
 *@param {Number} w The platform width
 *@param {Number} h The platform height
*/
function Platform(x, y, w, h = w / 2){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.col = "black";
	this.stroke = "white";
	
	this.draw = function(){
		c.beginPath();
		c.fillStyle = this.col;
		c.strokeStyle = this.stroke;
		c.rect(this.x,this.y,this.w,this.h);
		c.fill();
		c.stroke();
		c.closePath();
	}
}

/**
 * This is the background. It repeats the pattern given over and over.
 * @param {Object} pattern The pattern to copy over and over
 * @param {Number} movePercentage The amount the background moves relative to how much the player moves
*/
function Background(pattern, movePercentage){
	this.pattern = pattern;
	this.movePercentage = movePercentage / 100;
	
	/**
	 * Draws the background, redrawing the same background
	 * as many times as it will fit.
	*/
	this.draw = function(){
		
		let patternW = this.pattern.w;
		let patternH = this.pattern.h;
		
		let maxFitW = Math.ceil(W / patternW);
		let maxFitH = Math.ceil(H / patternH);
		
		for (let i = 0; i < maxFitW; i++){
			for (let j = 0; j < maxFitH; j++){
				this.pattern.draw(i * patternW, j * patternH);
			}
		}
	}
}
/**
 * This is the pattern repeated over and over in the background.
 * 
*/
function BackgroundPattern(shapes,w,h){
	this.shapes = shapes;
	this.w = w;
	this.h = h;
	
	/**
	 * Draws all of the shapes within this.shapes relative to the given x and y
	*/
	this.draw = function(x = 0,y = 0){
		for (shape of shapes){
			shape.draw(x,y);
		}
	}
}

/**
 * A shape, to be used in a background pattern.
 * @param {String} type The type of the shape
 * @param {Array} info The information of the shape.
 * @param {String} col The color of the shape.
 * If rect, then info contains: x, y, width, height
 * If circle, the info contains: x, y, r
*/
function BackgroundShape(type, info, col){
	this.type = type;
	this.info = info;
	this.col = col;
	
	/**
	 * Draws the background, starting at the provided x and y values
	 * @param x The starting x value
	 * @param y The starting y value
	*/
	this.draw = function(startX, startY){
		if (this.type === "rect"){
			let x = this.info[0];
			let y = this.info[1];
			let w = this.info[2];
			let h = this.info[3];
			
			let totalX = x + startX;
			let totalY = y + startY;
			
			c.beginPath();
			c.fillStyle = this.col;
			c.fillRect(totalX,totalY,w,h);
			c.closePath();
		}
	}
}
