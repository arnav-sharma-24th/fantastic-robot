var PLAY=1
var END=0;
var gameState=PLAY
var score
var backround,back;
var bird,birdImage;
var dragon,dragonImage;
var helicopterImage;
var meteor,meteorImage;
var restartImg,restart;
var gameOverImg,gameOver;
var helicopterGroup,meteorGroup,dragonGroup;

function preload(){
  birdImage=loadAnimation("bird.png","birdman.png");
  dragonImage=loadImage("draco.png");
  helicopterImage=loadImage("cancould.png");
  meteorImage=loadImage("nuke.png");
  back = loadImage("backround.png");
   restartImg = loadImage("reset.png")
  gameOverImg = loadImage("gameOver2.png");
  obstaclesGroup = new Group();
  helicopterGroup = new Group();
  meteorGroup = new Group();
  dragonGroup = new Group();
}

function setup() {
 createCanvas(600,450);
  
  backround = createSprite(200,250,displayWidth,displayHeight);
  backround.addImage("round",back)
  backround.scale=1.3;
  
  bird=createSprite(100,100,10,10)
  bird.addAnimation("fly",birdImage);
  bird.scale=1.2;
  bird.setCollider("rectangle",0,0,30,30);
  bird.debug = true;


   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,200);
  restart.addImage(restartImg);
  
  
  score = 0;
}

function draw() {
  
 background("white");
 
 
  
  if(gameState===PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
     backround.velocityX = -(4 + 3* score/100);
    
    
    score = score + Math.round(getFrameRate()/60);
     if (backround.x < 75){
      backround.x = backround.width/2;
    }
    
     if(keyDown("space")) {
        bird.velocityY = -5;
     }
    
    if(bird.isTouching(helicopterGroup) ||bird.isTouching(meteorGroup)||bird.isTouching(dragonGroup)||bird.y>450||bird.y<0){
       
      gameState =END;
       }
    
    bird.velocityY=bird.velocityY+0.18;
     spawnMeteor();
    spawnHeli();
    spawnDragon();
  }
  
  else if(gameState===END){
    backround.velocityX=0;
    bird.velocityY=0;
    helicopterGroup.setVelocityXEach(0);
    meteorGroup.setVelocityXEach(0);
    dragonGroup.setVelocityXEach(0);
    helicopterGroup.setLifetimeEach(-1);
   meteorGroup.setLifetimeEach(-1);
     dragonGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    score = 0;
     if ( mousePressedOver(restart)) {
      gameState = PLAY;
       helicopterGroup.destroyEach();
       meteorGroup.destroyEach();
       dragonGroup.destroyEach();
       bird.y=200;
    }

  }
  
  
  drawSprites();
  textSize(23)
  text("score"+score,450,50);
}

function spawnMeteor(){
 if (frameCount % 60 === 0){
   var meteor = createSprite(600,Math.round(random(100,400)),50,50)
   meteor.addImage(meteorImage);
   meteor.scale=0.12;
   meteor.velocityX=-(6 + score/100);
   meteorGroup.add(meteor);
  
    
 }
}


function spawnHeli(){
 if (frameCount % 50 === 0){
   var helicopter = createSprite(600,Math.round(random(100,400)),50,50)
   helicopter.addImage(helicopterImage);
  helicopter.scale=0.2;
  helicopter.velocityX=-(6 + score/100);
  helicopterGroup.add(helicopter); 
  
    
 }
}

function spawnDragon(){
 if (frameCount % 120 === 0){
   var dragon = createSprite(600,Math.round(random(100,400)),50,50)
   dragon.addImage(dragonImage);
  dragon.scale=2;
  dragon.velocityX=-(6 + score/100);
  dragonGroup.add(dragon); 
  
    
 }
}