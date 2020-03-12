let mic;
let scorePlayer = -1;
let scoreEnemy = -1;
let coin;
let scoreShow;
let playing = true;
let player;
var socket;
let enemy;
let enemyReady = false;
let clicked = false;

let screenWidth = 1500;
let screenHeight = 1000;

function setup() {
  createCanvas(screenWidth, screenHeight);
  frameRate(60);
  score = 0;
  player = new Plane(height,width/2,"PBOI", mic, loadImage('planefinal.png'));
  enemy = new Plane(height,0,"PBOI", null, loadImage('planefinalblauw.png'));
  coin = new Coin(width, height, loadImage('coinIMG.png'), 75, 25);
  socket = io.connect();
  socket.on('pos',drawEnemys);
  socket.on('death',restart);
  socket.on('ready',ready);
  socket.on('seed', function seed(seed) {
    noiseSeed(seed);
  })
}

let noiseScale=0.04;
let viewportOffset = 0;
let xpos =0;

function draw() {
  background(220);
  if (getAudioContext().state == 'running' && playing && enemyReady) {
    //socket.emit('pos',player);
  //  console.log(getFrameRate());
    //---------------------------UPDATE START------------------------------

    player.mic = mic;
    image(enemy.img,width/2- (xpos-enemy.x)-20,enemy.y -20,40,40);
    player.update();
    coin.draw();
    coin.update();
    xpos += (player.planeSpeed +player.speedMulti)*(deltaTime / 50);
    generateTerrain();
    collision();
    scoreUpdate();
    //socket.emit('pos',player);

    //--------------------------UPDATE END----------------------------------

  }else{
    scoreEnemy = 0;
    scorePlayer = 0;
    if(playing){
      background(220);
      textSize(32);
      text('CLICK TO PLAY', width/2-120, height/2);
      fill(0, 102, 153);
    }else{
      background(220);
      textSize(32);
      text('YOU WIN', width/2-120, height/2);
      fill(0, 102, 153);
    }
  }
}

//-----------------------------------------FUNCTIONS------------------------------

function generateTerrain(){
  let xi = 0;
  for (let x=0; x < width; x++) {
    xi += 0.1;
    let noiseVal = noise((xi+xpos)*noiseScale, noiseScale);
    line(x, noiseVal*500-100, x, -height);
    line(x, noiseVal*1200+100, x, height);
  }
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    console.log("resume");
  }
  mic = new p5.AudioIn();
  mic.start();
  player.mic = mic;
  if(!clicked){
    socket.emit('start');
    clicked = true;
  }
}

function collision(){
  if(player.y > noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*1200+100 ||
     player.y < noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*500-100){
       //CODE RUNS WHEN PLAYER DIES-----------------------------------------------
       socket.emit('death');
        player.y = noise(((0.1*width/2))*noiseScale, noiseScale)*1200+100 -100;
        if(noise(((0.1*width/2))*noiseScale, noiseScale)*1200+100 -100 > height){
          player.y = height-200;
        }
    score = 0;
    player.planeSpeed = 0.3;
    xpos = 0;
    scoreEnemy++;
  }
  var pos = {
    x:xpos,
    y:player.y
  };
  socket.emit('pos',pos);
}

function scoreUpdate(){
  fill(255, 0, 0);
  rect(0, 0, 50+score/0.5, 40);
  fill(255,255,255);
  textSize(32);
  fill(0,0,0);
  text(scorePlayer, 10, 30);
  fill(0, 128, 255);
  rect(width-100, 0, 100, 40);
  fill(255,255,255);
  textSize(32);
  fill(0,0,0);
  text(scoreEnemy, width-100+10, 30);
  text(getFrameRate(), width/2, 30);
}

function drawEnemys(pos){
  enemy.y = pos.y;
  enemy.x = pos.x;
}

function restart(){
  score = 1;
  player.planeSpeed = 0.3;
  xpos = 0;
  player.y = noise(((0.1*width/2))*noiseScale, noiseScale)*1200+50 -100;
  if(noise(((0.1*width/2))*noiseScale, noiseScale)*1200+50 -100 > height){
    player.y = height-200;
  }
  scorePlayer ++;
}
function ready(){
  enemyReady = true;
}
