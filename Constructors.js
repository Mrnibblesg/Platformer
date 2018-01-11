/**
 *The platform object, the one the player can interact with.
 *@param x The x location
 *@param y The y location
 *@param w The platform width
 *@param h The platform height
*/
function Platform(x, y, w, h = w / 2){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.draw = function(){
		c.beginPath();
		c.fillStyle = "black";
		c.fillRect(this.x,this.y,this.w,this.h);
		c.closePath();
	}
}

/**
 * This is the background. It repeats the pattern given over and over.
 *
*/
function Background(pattern, movePercentage){
	this.pattern = pattern;
	this.movePercentage = movePercentage;
	
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
 * @param type The type of the shape
 * @param info The information of the shape.
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
