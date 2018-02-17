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
	this.shown = true;
	
	this.buttons = buttons;
	
	this.draw = function(){
		if (this.shown){
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
	}
	
	this.toggleSize = function(){
		this.minimized = !this.minimized;
	}
	this.uncheckBoxes = function(){
		for (let button of this.buttons){
			if (button.type === "check"){
				button.checked = false;
				button.undo();
				
			}
		}
	}
}

/**
 * The button is a clickable item that goes in an infobox's lines property.
 * when clicked, it executes its function.
 */
function Button(relX,relY,w,h,text,col,type,func,func2 = undefined){
	this.relX = relX;
	this.relY = relY;
	this.w = w;
	this.h = h;
	this.text = text;
	this.execute = func;
	this.col = col;
	this.type = type;
	
	if (this.type === "check"){
		this.checked = false;
		this.undo = func2;
		this.w = 20;
		this.h = 20;
	}
	
	this.draw = function(infoBoxX,infoBoxY){
		let totalX = infoBoxX + this.relX;
		let totalY = infoBoxY + this.relY;
		
		if (this.type === "normal"){
			//Draw box, then text
			drawRect(totalX,totalY,this.w,this.h,this.col,"black",true);
			drawText(this.text,totalX + 5,totalY + 5, "15px Verdana", "start", "hanging", "black");
		}
		
		
		
		else if (this.type === "check"){
			
			drawRect(totalX,totalY,20,20,"white","black",true);
			if (this.checked){
				drawText("X",totalX + 5,totalY + 4,"15px Verdana", "middle","center","red");
			}
			drawText(this.text,totalX + 25, totalY + 5, "15px Verdana", "start", "hanging", "black");
			
		}
	};
	this.check = function(){
		if (!(this.type === "check")){ return; }
		
		if (this.checked){
			this.undo();
			this.checked = false;
		}
		else if (!this.checked){
			this.execute();
			this.checked = true;
			
		}
	};
}

let editor = {
	infoBoxes: [],
	savedLevelData: [],
	
	keepCreating: false,
	selectMode: false,
	gridSnap: 5,
	moveAmount: 2,
	
	
	
	levelDataFrame: {
		platformGroup: new PlatformGroup(),
		spawnpoint: new Spawnpoint(0,0),
		
		draw: function(){
			if (exists(this.platformGroup)){
				this.platformGroup.draw();
			}
			this.spawnpoint.draw();
		},
		create: function(){
			let clonedPlatformGroup = deepClone(this.platformGroup);
			let clonedSpawnpoint = deepClone(this.spawnpoint);
			
			return new LevelData(clonedPlatformGroup,clonedSpawnpoint);
		},
		load: function(levelData){
			
			this.platformGroup = deepClone(levelData.platformGroup);
			this.spawnpoint = deepClone(levelData.spawnpoint);
			
		}
	},
	
	platFrame: {
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
			if (this.x1 > this.x2){
				let placeHold = this.x1;
				this.x1 = this.x2;
				this.x2 = placeHold;
			}
			if (this.y1 > this.y2){
				let placeHold = this.y1;
				this.y1 = this.y2;
				this.y2 = placeHold;
			}
			
			let w = this.x2 - this.x1;
			let h = this.y2 - this.y1;
			
			if (w < 2){
				w = 2;
			}
			if (h < 2){
				h = 2;
			}
			
			let newPlatform = new Platform(this.x1,this.y1,w,h);
			this.reset();
			
			return newPlatform;
		},
		
		reset: function(){
			if (!editor.keepCreating){
				this.creating = false;
			}
			
			this.x1 = undefined;
			this.x2 = undefined;
			this.y1 = undefined;
			this.y2 = undefined;
			this.corner1 = false;
			this.corner2 = false;
		}
	},
	
	spawnFrame: {
		midX: undefined,
		midY: undefined,
		
		isPlaced: false,
		creating: false,
		
		draw: function(){
			if (this.creating && this.isPlaced){
				drawRect(this.midX,this.midY,20,20,"rgba(255,0,0,0.5)","rgba(0,0,0,0.5)");
			}
		},
		create: function(){
			let newSpawn = new Spawnpoint(this.midX,this.midY);
			
			if (!editor.keepCreating){
				this.reset();
			}
			
			return newSpawn;
		},
		reset: function(){
			if (!editor.keepCreating){
				this.creating = false;
			}
			this.midX = undefined;
			this.midY = undefined;
			this.isPlaced = false;
		}
	}
}
