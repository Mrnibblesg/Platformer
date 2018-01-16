/**
 *@fileOverview Extra functions that I did not want to put into any of the other files live here.
 */
 
/**
 * The most basic draw function, but with added screen offsets.
 * BACKGROUNDS SHOULD NOT USE THIS!
 */
function drawRect(x,y,w,h,col,stroke){
	c.beginPath();
	c.fillStyle = col;
	c.strokeStyle = stroke;
	c.rect(x + screen.x,y + screen.y,w,h);
	c.fill();
	c.stroke();
	c.closePath();
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
