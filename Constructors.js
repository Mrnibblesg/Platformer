function Platform(x,y,w,h = 2 * w){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.draw = function(){
		C.beginPath();
		C.fillStyle = "black";
		C.fillRect(this.x,this.y,this.w,this.h);
		C.closePath();
	}
}
