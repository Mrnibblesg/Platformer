/**
 *Initializes the game object
*/
function initialize(){
	//Initialize game object
	let newPlayer = new Player(W/2,H/2 - 50,20);
	game.player = newPlayer;
	
	newPlayer.draw();
	
	//Initialize background
	let pattern = [];
	pattern.push(new BackgroundShape("rect",[0,0,50,50],"black"));
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
		
		
		for (platform of this.platforms){
			if (player.isColliding(platform)){
				player.rectCollide(platform);
			}
		}
	}
	
	requestAnimationFrame(gameLoop);
}
