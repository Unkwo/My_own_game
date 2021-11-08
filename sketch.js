var player, playerImage;
var bulletImage;
var asteroidImage;
var asteroid = [];
var bulletGroup, asteroidGroup;
var gameState = 0;
var score = 0;
var bullet;
var y = "Hello, Press right arrow to play the game";
var z = "Use up and down arrows to move the spaceship";
var a = "Use left arrow to shoot bullets";
var g = "GAME OVER";

function preload(){
  playerImage = loadImage("jetImage.png");
  asteroidImage = loadImage("download.jpg");
  bulletImage = loadImage("BulletImage.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bulletGroup = new Group();
  asteroidGroup = new Group();
  
  player = createSprite(30, 200, 40, 40);
  player.addImage(playerImage);
  player.scale = 0.5;
  
}

function draw() {
  background("blue"); 
   
  
  if(gameState == 0){
    text(y, width/2, 100);
    textSize(10);

    showText();
    showControls();
  } else if(gameState == 1){
    handlePlayerControls();
    createAsteroids();
    shootBullets();
    text(score, width/2, height/2-300);
    text("Score:", width/2-60, height/2-300);
    incrementScore();
  }
  
if(keyIsDown(RIGHT_ARROW)){
  gameState = 1;
  
}

if(score == 10 || 
  asteroidGroup.isTouching(player)){
  gameState = 2;

  
}

if(gameState == 2){
  gameOver();
}

drawSprites();
    
  }

  
   



function createAsteroids(){
  if(gameState == 1 && frameCount % 500 === 0){
    asteroid = createSprite(width-50,random(30,570),40,40);
    asteroid.addImage(asteroidImage);
    asteroid.scale = 0.4;
    asteroid.velocityX = -3;
    asteroidGroup.add(asteroid);
    asteroid.lifetime = 800;
  }
}

function shootBullets(){
  if(keyDown(LEFT_ARROW) && frameCount % 30 === 0 ){
    bullet = createSprite(player.position.x, player.position.y, 40, 40);
    bullet.addImage(bulletImage);
    bullet.scale = 0.04;
    bullet.velocityX = 5;
    bulletGroup.add(bullet);
     bullet.lifetime = 800;  
     }
}

function handlePlayerControls(){
  if(keyIsDown(UP_ARROW)){
    player.position.y -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    player.position.y += 10;
  }
}

function showText(){
  text(z, width/2, 200);
    textSize(15);
}

function showControls(){
  text(a, width/2, 300);
  textSize(20);
}

function incrementScore(){
  if(bulletGroup.isTouching(asteroidGroup)){
    score += 1;
    asteroid.destroy();
    bullet.destroy();
  }
}

function gameOver(){
 
    text(g, width/2, height/2+30);
    textSize(20);
    stroke("red");

    asteroidGroup.destroyEach();
  
}

