var runner, zombie, background, rock, tree,ground,invisibleGround,gameOver,win;
var runnerImg, zombieImg, backgroundImg, rockImg, treeImg,groundImg,gameOverImg,winImg;
var rockGrp,treeGrp;
var score;
var gamestate="play";

function preload(){
    runnerImg=loadImage("Runner.png");
    zombieImg=loadImage("zombie.png");
    rockImg=loadImage("rock.png");
    treeImg=loadImage("tree.png");
    groundImg=loadImage("ground2.png");
    gameOverImg=loadImage("download.jpg")
    winImg=loadImage("You win.jpg");
}

function setup() {
    createCanvas(600,200);

    ground = createSprite(200,170,400,20);
    ground.addImage("ground",groundImg);
    ground.x = ground.width /2;

    invisibleGround = createSprite(200,190,400,20);
    invisibleGround.visible=false;

    zombie = createSprite(30,165,10,50);
    zombie.addImage("zombie",zombieImg);
    zombie.scale=0.15;

    runner = createSprite(100,165,10,50);
    runner.addImage("zombie",runnerImg);
    runner.scale=0.2;

    gameOver = createSprite(300,70,10,10)
    gameOver.addImage("gameOver",gameOverImg);
    gameOver.scale=0.8;
    gameOver.visible=false;

    win=createSprite(300,70,10,10);
    win.addImage("win",winImg)
    win.scale=0.7
    win.visible=false;

    rockGrp = createGroup();
    treeGrp = createGroup();     
}

function draw() {
    background("grey");

    if(gamestate=="play"){

        if(keyDown("space")&&runner.y>160){
            runner.velocityY=-12;            
        }

       ground.velocityX=-5;

       if (ground.x < 0){
           ground.x = ground.width/2;
       }

       zombie.velocityY=zombie.velocityY+0.8;
       zombie.collide(invisibleGround);

       runner.velocityY=runner.velocityY+0.8;
       runner.collide(invisibleGround);

       score=World.seconds;

       if(rockGrp.isTouching(runner)||treeGrp.isTouching(runner)){
           gamestate="end";
       }

       if(score==100){
           gamestate="win"
       }

       rocks();
       trees();

       textSize("25");
       fill("black");
       text("Score:"+score,100,10);
    }

    if(gamestate=="end"){
        gameOver.visible=true;

        treeGrp.destroyEach();
        rockGrp.destroyEach();
        ground.visible=false;
        runner.visible=false;
        zombie.visible=false;

        if(keyDown("r")){
            restart();
        }        

        textSize("25");
        fill("black");
        text("You became a zombie.Press R to restart",200,170);
    }

    if(gamestate=="win"){
        win.visible=true;

        treeGrp.destroyEach();
        rockGrp.destroyEach();
        ground.visible=false;
        runner.visible=false;
        zombie.visible=false;

        if(keyDown("r")){
            restart();
        }  

        textSize("25"); 
        fill("black");
        text("Thanks fo Playing,Press R to restart",200,170);        
    }

    drawSprites(); 
}

function rocks(){

    if(World.frameCount%140==0){
        rock = createSprite(640,170,10,10);
        rock.addImage("rock",rockImg);
        rock.scale=0.15;
        rock.velocityX=-5;
        rockGrp.add(rock);     
        rockGrp.setLifetimeEach(150);   
    }
}

function trees(){

    if(World.frameCount%140==0){
        tree = createSprite(890,170,10,10);
        tree.addImage("tree",treeImg);
        tree.scale=0.15;
        tree.velocityX=-5;
        treeGrp.add(tree);
        treeGrp.setLifetimeEach(150);
    }
}

function restart(){
    gamestate="play"

    gameOver.visible=false;

    win.visible=false;

    ground.visible=true;
    zombie.visible=true;
    runner.visible=true;
}