var bg,bgImg;
var player, shooterImg, shooter_shooting;
var gameOverImg, gameOverSprite
var bullet, bulletImg, bulletGroup
var blast, blastImg
var gameState = "play"

var score = 0


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombie1 = loadImage("assets/Zombie.png")
  zombie2 = loadImage("assets/Zombie2.png")
  zombie3 = loadImage("assets/Zombie3.5.png")
  zombie4 = loadImage("assets/Zombie4.png")
  gameOverImg = loadImage("assets/gameover.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/Bullet.png")
  blastImg = loadImage("assets/blast.png")

  loseSound = loadSound("assets/explosion.mp3")
  killSound = loadSound("assets/lose.mp3")
  winSound = loadSound("assets/win.mp3")
  backgroundMusic = loadSound("assets/BGMUSIC.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-260, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

gameOverSprite = createSprite(displayWidth/2-100, displayHeight/2, 50,50)
 gameOverSprite.addImage(gameOverImg)
gameOverSprite.visible = false


  
zombiesGroup = new Group()
bulletGroup = new Group()
gameState = "play"

backgroundMusic.play()
backgroundMusic.setVolume(0.1)

}

function draw() {
  background(0); 




      //moving the player up and down and making the game mobile compatible using touches
if (gameState === "play"){



if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}



//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  shooting()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
}
else if (gameState === "end"){   
}

if (zombiesGroup.collide(player)){
  gameOver()
}

if (zombiesGroup.overlap(bulletGroup)){
  HandleShooting(zombiesGroup)
}




console.log(score)
spawn()
drawSprites();

textSize(30);
text("Score: " + score, 500, 50);

if (gameState === "play"){
console.log("is playing")
}

if (gameState === "end"){
  console.log("is not playing")
}

}

function spawn(){
  if (gameState === "play" && frameCount % Math.round(random(20,40)) === 0){
   var zombies = createSprite(displayWidth/2 + 360,displayHeight/2 + 100, 3, 35)
   zombies.velocityX = -7
   zombies.scale = 2
 
   var rand = Math.round(random(1,4));
   switch(rand){
     case 1: zombies.addImage(zombie1);
             break;
     case 2: zombies.addImage(zombie2);
             break;
     case 3: zombies.addImage(zombie3);
             break; 
     case 4: zombies.addImage(zombie4);
             break; 
     default:break;
     }
  
   zombies.depth = player.depth
   //player.depth += 1



   zombiesGroup.add(zombies)
  }
  else if (gameState === "end"){
      
  }

 }

 function gameOver(){
   console.log("works")
   zombiesGroup.setVelocityXEach(0)
   gameOverSprite.visible = true
   gameState = "end"
   textSize(100000);
   text("Score: " + score, displayWidth/2-100, displayHeight/2 + 50);
   loseSound.play();
   
  }

  function shooting(){
    if (gameState === "play"){
    bullet = createSprite(player.x + 10, player.y-25,50,50)
    bullet.addImage(bulletImg)
    bullet.velocityX = 10
    bullet.scale = 0.1
    bulletGroup.add(bullet)
    }
    else if (gameState === "end"){

    }
  }

  function HandleShooting(zombiesGroup){
    blast = createSprite(bullet.x,bullet.y,50,50)
    blast.scale = 0.2
    blast.addImage(blastImg)
    setTimeout(() => { blast.destroy(); }, 500);
    bullet.destroy()
    score = score + 1
    winSound.setVolume(0.1)
    winSound.play()
    
    zombiesGroup.destroyEach()
    killSound.setVolume(0.2)
    killSound.play()
 
  }