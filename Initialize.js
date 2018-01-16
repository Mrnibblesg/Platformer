/**
 * @fileOverview This file initializes the entire game at the beginning
 */

/**
 *Initializes the game object and screen object
 */
function initialize(){
	//Initialize the screen object
	screen.x = 0;
	screen.y = 0;
	screen.centerX = W/2;
	screen.centerY = H/2;
	screen.w = W;
	screen.h = H;
	
	//For logistic function when calculating how much to move
	screen.screenMoveSlope = 1995/2000;
	
	screen.follow = function(object){
		let lowerBoundaryW = 5 * W / 11;
		let upperBoundaryW = 6 * W / 11;
		let lowerBoundaryH = 2 * H / 5;
		let upperBoundaryH = 3 * H / 5;
		
		//These must not have the screen component added to it.
		let objCenterX = object.getCenterX() || object.x;
		let objCenterY = object.getCenterY() || object.y;
		
		objCenterX += this.x;
		objCenterY += this.y;
		
		let objDistanceFromCenterX = Math.abs(objCenterX - W/2);
		let objDistanceFromCenterY = Math.abs(objCenterY - H/2);
		
		
		//850 is just an arbitrary number chosen as an offset number.
		let screenMovePercentageX = logistic(0.2,this.screenMoveSlope,objDistanceFromCenterX,850);
		let screenMovePercentageY = logistic(0.3,this.screenMoveSlope,objDistanceFromCenterY,850);
		
		if (objCenterX < lowerBoundaryW){
			this.x += screenMovePercentageX * objDistanceFromCenterX;
		}
		else if (objCenterX > upperBoundaryW){
			this.x -= screenMovePercentageX * objDistanceFromCenterX;
		}
		if (objCenterY < lowerBoundaryH){
			this.y += screenMovePercentageY * objDistanceFromCenterY;
		}
		
		//Effect magnified by 50%, because I want to be able to see what's underneath me when I'm falling.
		else if (objCenterY > upperBoundaryH){
			this.y -= (screenMovePercentageY * 1.5) * objDistanceFromCenterY;
		}
	}
	
	
	//Initialize game object
	let newPlayer = new Player(W/2,H/2 - 50,20);
	game.player = newPlayer;
	
	newPlayer.draw();
	
	//Initialize background
	let pattern = [];
	pattern.push(new BackgroundShape("rect",[0,0,51,51],"black"));
	pattern.push(new BackgroundShape("rect",[5,5,40,40],"darkred"));
	
	let newBackgroundPattern = new BackgroundPattern(pattern,50,50);
	let newBackground = new Background(newBackgroundPattern,50);
	game.background = newBackground;
	
	//Initialize platforms (testing platforms only, not permanent)
	let platforms = [];
	platforms.push(new Platform(500,500,100,50));
	platforms.push(new Platform(650,500,100));
	platforms.push(new Platform(800,500,100));
	platforms.push(new Platform(950,500,100));
	platforms.push(new Platform(300,550,500));
	game.platforms = platforms;
	
	game.draw = function(){
		this.background.draw();
		this.player.draw();
		
		for (platform of this.platforms){
			platform.draw();
		}
	}
	
	//Try to find a better way to update stuff
	game.update = function(){
		let player = this.player;
		player.update();
		
		//Speed up by only checking nearby platforms
		for (platform of this.platforms){
			if (player.isColliding(platform)){
				player.rectCollide(platform);
			}
		}
	}
	
	requestAnimationFrame(gameLoop);
}
