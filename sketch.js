const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var engine, world;
var bgi1,bgi2;
var button,butimg;
var jacky,bird,birdsGroup;
var sound,sound2;
var gamestate="start"

function preload(){
bgi1=loadImage("bg1.jpg")
jackimg=loadImage("p.png")
bgi2=loadImage("bg2.jpg")
bird=loadImage("bird.png")
alien=loadAnimation("alien1.png","alien1.png","alien2.png","alien2.png")
coin=loadAnimation("coin1.png","coin2.png","coin3.png")
bulimg=loadImage("bullet.png")
buttonimg=loadImage("icon3.jpg")
sound=loadSound("g.mp3")
sound2=loadSound("sound.mp3")
}
function setup() {
  createCanvas(1300,545);
  engine = Engine.create()
  world = engine.world;
//background at start
bg1=createSprite(600,300,1300,600)
bg1.addImage("bg",bgi1)
bg1.scale=1.3
//background at play
bg2=createSprite(600,10,1200,600)
bg2.addImage("bg",bgi2)
bg2.scale=1.3
bg2.visible=false
bg2.velocityX = -10
//The player
jacky=createSprite(600,300)
jacky.addImage("jack",jackimg)
jacky.scale=0.2;
jacky.visible=false
//creating the button
button=createButton('PLAY')
//groups for the non players
birdsGroup=createGroup()
coinsGroup=createGroup()
bulletGroup=createGroup()
aliensGroup=createGroup()
}
function draw() {
  Engine.update(engine);
  background("white");  
//GAME STATE = START
 if(gamestate==="start"){
//button
button.position(800,300)
//button image
button.style('border-color','lawngreen')
button.style('border-width','10px')
button.style('border-corner','100px')
button.style('background','lightgreen')

//when we press the button
button.mousePressed(()=>{
gamestate="play"
})
 }
//GAME STATE = PLAY
 else if(gamestate==="play"){
//sounds
//sound.play()
//sound2.play()
jacky.visible=true
bg2.visible=true
bg1.visible=false
button.hide()
//making background as never ending background
if (bg2.x < 0){bg2.x = bg2.width/2;}
 //giving condition for moving jacky 
 jacky.velocityY=0
 if(keyDown("UP_ARROW")){jacky.velocityY=-12 }
if(keyDown("DOWN_ARROW")){ jacky.velocityY=+12}
//spawning the birds
spawnbirds()
//spawning coins
spawncoins()
//spawning aliens
spawnaliens()
//bullets
if (keyDown("space")) { createBullet();}
//destroying
if (bulletGroup.isTouching(aliensGroup)) {
bulletGroup.destroyEach();
aliensGroup.destroyEach();

}
if (jacky.isTouching(coinsGroup)) {
 coinsGroup.destroyEach()
}

 }
drawSprites()
}
function spawnbirds() {
  
  if (frameCount % 200 === 0) {
    var birds = createSprite(1000,160,40,10);
    birds.y = Math.round(random(80,120));
    birds.addImage(bird);
    birds.scale = 0.02;
    birds.velocityX = -3;
    birds.lifetime = 400;
    
     birdsGroup.add(birds);
  }
}
function spawncoins() {

  if (frameCount % 200 === 0) {
    var coins = createSprite(1200,10)
    coins.y = Math.round(random(20,370));
    coins.addAnimation("coin",coin);
    coins.scale = 0.3;
    coins.velocityX = -3;
    coins.lifetime = 400;
    coinsGroup.add(coins);
     
  }
  }
  function spawnaliens() {

    if (frameCount % 300 === 0) {
      var aliens = createSprite(1000,160)
      aliens.y = Math.round(random(20,370));
      aliens.addAnimation("alien",alien);
      aliens.scale = 0.4;
      aliens.velocityX = -3;
    
      aliens.lifetime = 400;
      aliensGroup.add(aliens);  
    }
    }
  function createBullet() {
    var bullet= createSprite(400, 100, 60, 10);
    bullet.addImage(bulimg);
    bullet.x =jacky.x
    bullet.y=jacky.y;
   
    bullet.velocityX = 4;
    bullet.lifetime = 200;
    bullet.scale = 0.1;
    bulletGroup.add(bullet)
    return bullet;
    
  }
  