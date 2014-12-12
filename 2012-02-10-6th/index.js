enchant();                      
window.onload = function() {
    game = new Game(320, 320);                   
    game.fps = 24;
    game.life = 4;
	game.time  = 0;		
	game.score = 000;		
	var label;
	game.preload(['http://jsrun.it/assets/k/r/t/X/krtXz.gif','http://jsrun.it/assets/v/1/a/l/v1alF.gif','http://jsrun.it/assets/e/B/C/G/eBCGr.gif']);
    game.onload = function() {      
        bear = new Sprite(32, 32);  
        bear.image = game.assets['http://jsrun.it/assets/k/r/t/X/krtXz.gif']; 
        bear.x = 160;               
        bear.y = 200;              
        bear.frame = 0;
		game.rootScene.addChild(bear);
		label = new Label("");
		label.x =0;
		label.y =17;
		game.rootScene.addChild(label);
		game.time = game.fps * game.time;
        game.rootScene.addEventListener('touchmove', function(move){
            bear.y = move.localY -50;
            bear.x = move.localX -20;
        });
		count = 0;
        game.rootScene.addEventListener('enterframe',function(){
			if(game.frame % 4 == 0){ bear.frame = game.frame % 3;}
			if(game.frame % 10 == 0){ 
	            if (game.frame % 3 == 0) {additem(14);}
	            else if (game.frame % 7 == 0) {additem(30);}
				else{additem(24);}
				label.text = "スコア" + game.score + "<br>残り時間" + Math.floor(game.time / game.fps) +"秒";
				}
			game.time ++;
			game.frameCount ++;
			if (game.life == 0){game.end(game.score, "あなたのスコアは" + game.score);}
			if (game.time == 0){game.end(game.score, "あなたのスコアは" + game.score);}});
			setLifes();
			}
    game.start();
}
function additem(item_frame){
    var item = new Sprite(16, 16);
    item.image = game.assets['http://jsrun.it/assets/v/1/a/l/v1alF.gif']; 
    item.x = rand(304);               
    item.y = 0;                          
    item.frame = item_frame; 
    item.addEventListener('enterframe', function() {
        if(this.intersect(bear)){     
            if (item.frame == 14) {//CASE1
				game.rootScene.removeChild(this); 
				game.score +=  10;                   
            }
			else if (item.frame == 30) {//CASE2
				game.rootScene.removeChild(this); 
				game.score +=  50;                   
            }
			else if (item.frame == 24){//CASE3
            	game.rootScene.removeChild(this);
            	game.life --;
            	life.width = 16 * game.life;}
        }else{this.y += 2;}});
	count++;
    game.rootScene.addChild(item);
}
function rand(num){	return Math.floor(Math.random() * num);	}
function setLifes(){
    life = new Sprite(16 * game.life,16);
    life.image = game.assets['http://jsrun.it/assets/e/B/C/G/eBCGr.gif'];
    life.set = function(num){
        game.life = num;
        this.width = 16 * 3;}
    game.rootScene.addChild(life);
}
