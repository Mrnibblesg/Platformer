"use strict";

/**
 * The InfoBox class is a container for information so that you know the controls
 * and know how to use the editor.
 */
function InfoBox(x,y,w,h,header,lines,buttons = []){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.header = header;
	
	this.lines = lines;
	this.buttons = buttons;
	
	this.minimized = false;
	
	this.buttons = buttons;
	
	this.draw = function(){
		if (this.minimized){
			//Draw maximize button only
			drawRect(this.x,this.y,20,20,"green","black",true);
			drawText("+",this.x + 10,this.y + 8, "20px Verdana","center","middle","white");
			
		}
		else{
			//Draw box, then contents
			
			
			//Draw box
			drawRect(this.x,this.y,this.w,this.h,"silver","black",true);
			
			//Draw minimize button
			drawRect(this.x,this.y,20,20,"red","black",true);
			drawText("-", this.x + 10, this.y + 8, "30px Verdana", "center", "middle", "white");
			
			//Draw text and buttons
			for (let i = 0; i < this.lines.length; i++){
				
				let contents = this.lines[i];
				let x = this.x + 10;
				let y = this.y + (i + 1) * 20 + 10;
				
				if (typeof(contents) === "string"){
					drawText(contents,x,y,"15px Verdana", "start", "hanging", "black");
					
				}
			}
			
			//Draw the header
			drawRect(this.x + 20,this.y,this.w - 20,20,"gray","black",true);
			drawText(this.header, this.x + (this.w - 20) / 2 + 20, this.y + 10, "15px Verdana", "center","middle","white");
			
			
			for (let button of this.buttons){
				button.draw(this.x,this.y);
			}
		}
	}
	
	this.toggleSize = function(){
		this.minimized = !this.minimized;
	}
}

/**
 * The button is a clickable item that goes in an infobox's lines property.
 * when clicked, it executes its function.
 */
function Button(relX,relY,w,h,text,func){
	this.relX = relX;
	this.relY = relY;
	this.w = w;
	this.h = h;
	this.text = text;
	this.execute = func;
	
	this.draw = function(infoBoxX,infoBoxY){
		let totalX = infoBoxX + this.relX;
		let totalY = infoBoxY + this.relY;
		
		//Draw box, then text
		drawRect(totalX,totalY,this.w,this.h,"green","black",true);
		drawText(this.text,totalX + 5,totalY + 5, "15px Verdana", "start", "hanging", "black");
	}
}
let platFrame = {
	x1: undefined,
	y1: undefined,
	x2: undefined,
	y2: undefined,
	
	corner1: false,
	corner2: false,
	creating: false,
	
	
	draw: function(){
		if (this.creating){
			if (this.corner1 && this.corner2){
				let w = this.x2 - this.x1;
				let h = this.y2 - this.y1;
				drawRect(this.x1,this.y1,w,h,"transparent","red",false);
			}
			else if (this.corner1){
				drawCircle(this.x1,this.y1,2,"red");
			}
		}
	},
	
	create: function(){
		console.log("creating");
		let w = this.x2 - this.x1;
		let h = this.y2 - this.y1;
		let newPlatform = new Platform(this.x1,this.y1,w,h);
		this.reset();
		return newPlatform;
	},
	
	reset: function(){
		this.creating = false;
		this.x1 = undefined;
		this.x2 = undefined;
		this.y1 = undefined;
		this.y2 = undefined;
		this.corner1 = false;
		this.corner2 = false;
	}
}
