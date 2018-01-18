"use strict";
function InfoBox(x,y,w,h,lines = []){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.lines = lines;
	
	this.minimized = false;
	
	this.buttons;
	
	this.draw = function(){
		if (this.minimized){
			//Draw maximize button only
			drawRect(this.x,this.y,20,20,"green","black",true);
			c.beginPath();
			c.fillStyle = "white";
			c.font = "30px Verdana";
			c.textAlign = "center";
			c.textBaseline = "middle";
			c.fillText("+",this.x + 10,this.y + 8);
			c.closePath();
		}
		else{
			//Draw box
			drawRect(this.x,this.y,this.w,this.h,"silver","black",true);
			
			//Draw minimize button
			drawRect(this.x,this.y,20,20,"red","black",true);
			c.beginPath();
			c.fillStyle = "white";
			c.font = "30px Verdana";
			c.textAlign = "center";
			c.textBaseline = "middle";
			c.fillText("-",this.x + 10,this.y + 8);
			c.closePath();
			
			//Draw text
			for (let i = 0; i < this.lines.length; i++){
				c.beginPath();
				c.fillStyle = "black";
				c.font = "15px Verdana";
				c.textAlign = "start";
				c.textBaseline = "hanging";
				c.fillText(this.lines[i],this.x + 10, i * 20);
				c.closePath();
			}
		}
	}
	
	this.minimize = function(){
		this.minimized = true;
	}
	this.maximize = function(){
		this.minimized = false;
	}
}
function button(x,y,w,h,text,func){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.text = text;
	this.execute = func;
	
}