var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloud_img;
var obs1,obs2,obs3,obs4,obs5,obs6,rand,score = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloud_img =loadImage("cloud.png");
  
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background("white");
  
  spawnClouds();
  spawnObstacles();
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  score = score+Math.round(getFrameRate()/60);
  text("score:"+score,200,100);
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width,160,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
     rand = Math.round(random(1,6));
    console.log(rand);
    switch(rand){
      case 1: obstacle.addImage(obs1) 
        break;
        case 2: obstacle.addImage(obs2) 
        break;
        case 3: obstacle.addImage(obs3) 
        break;
        case 4: obstacle.addImage(obs4) 
        break;
        case 5: obstacle.addImage(obs5) 
        break;
        case 6: obstacle.addImage(obs6) 
        break;
        
        default:break;
      }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    //obstacle.lifetime = -width/obstacle.veloctiyX;
    //console.log(obstacle.lifetime);
  }
}

function spawnClouds(){
  if(frameCount%70==0){
    var clouds = createSprite(width,random(50,150),10,10);
    clouds.velocityX = -4;
    clouds.addImage(cloud_img);
    clouds.scale = 0.5; 
    trex.depth = clouds.depth+1;
    clouds.lifetime = Math.round(-width/clouds.velocityX);
    console.log(clouds.lifetime);
     }
  
}