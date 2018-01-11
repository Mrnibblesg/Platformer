let drawRect = function(x,y,w,h,col = "black"){
	c.beginPath();
	c.fillStyle = col;
	c.fillRect(x,y,w,h);
	c.closePath();
}