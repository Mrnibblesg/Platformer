"use strict";
/**
 *@fileOverview Extra functions that I did not want to put into any of the other files live here.
 */
 
/**
 * The most basic draw function, but with added screen offsets.
 * BACKGROUNDS SHOULD NOT USE THIS!
 */
function drawRect(x,y,w,h,col,stroke,followsScreen = false){
	if (!followsScreen){
		x += screen.x;
		y += screen.y;
	}
	
	c.beginPath();
	c.fillStyle = col;
	c.strokeStyle = stroke;
	c.rect(x,y,w,h);
	c.fill();
	c.stroke();
	c.closePath();
}
function drawText(str,x,y,font,align,base,col){
	c.beginPath();
	c.fillStyle = col;
	c.font = font;
	c.textAlign = align;
	c.textBaseline = base;
	c.fillText(str,x,y);
	c.closePath();
}
function drawCircle(x,y,r,col,followsScreen = false){
	if (!followsScreen){
		x += screen.x;
		y += screen.y;
	}
	
	c.beginPath();
	c.fillStyle = col;
	c.arc(x,y,r,0,2*Math.PI);
	c.fill();
	c.closePath();
}

function drawLine(x1,y1,x2,y2,stroke){
	c.beginPath();
	c.strokeStyle = stroke;
	c.moveTo(x1,y1);
	c.lineTo(x2,y2);
	c.stroke();
	c.closePath();
}

function drawGrid(gridSize){
	if (gridSize === 0) {return;}
	
	let screenOffX = screen.x % gridSize;
	let screenOffY = screen.y % gridSize;
	
	//Vertical lines
	for (let i = 0; i < Math.ceil(W / gridSize); i++){
		let lineX = (gridSize * i) + screenOffX;
		drawLine(lineX,0,lineX,H,"gray");
	}
	
	//Horizontal lines
	for (let i  = 0; i < Math.ceil(H / gridSize); i++){
		let lineY = (gridSize * i) + screenOffY;
		drawLine(0,lineY,W,lineY,"gray");
	}
}


/**
* Gets the distance from 1 point to another.
*/
function getDistance(x1,y1,x2,y2){
	let xOff = x1 - x2;
	let yOff = y1 - y2;
	return Math.sqrt(xOff * xOff + yOff * yOff);
}

function logistic(max,steepnessCoefficient,x,xOffset){
	let exponent = x - xOffset;
	let denominator = 1 + Math.pow(steepnessCoefficient,exponent);
	return max / denominator;
}

/**
 * Check if an object exists
 */
 
function exists(obj){
	if (obj){
		return true;
	}
	return false;
}

//It's assumed that obj is a rect with a w and h property
function pointInsideRect(x,y,obj,countScreen = false){
	let objX = obj.x;
	let objY = obj.y;
	let objW = obj.w;
	let objH = obj.h;
	
	if (countScreen){
		objX += screen.x;
		objY += screen.y;
	}
	
	if (x > objX && y > objY &&
	x < objX + objW && y < objY + objH){
		
		return true;
		
	}
	return false;
}
function deepClone(obj){
	let clone;
	
	//Handle null, undefined, and primitive
	if (obj === null || typeof obj !== "object"){
		return obj;
	}
	
	//Handle arrays
	if (obj instanceof Array){
		clone = [];
		
		for (let i = 0; i < obj.length; i++){
			clone[i] = deepClone(obj[i]);
		}
		
		return clone;
	}
	
	//Handle objects
	if (obj instanceof Object){
		clone = {};
		
		for (let attr in obj){
			if (obj.hasOwnProperty(attr)){
				clone[attr] = deepClone(obj[attr]);
			}
		}
		
		return clone;
	}
	
	throw new Error("Object not cloned");
}
