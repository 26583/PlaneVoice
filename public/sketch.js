let mic;
let scorePlayer = -1;
let scoreEnemy = -1;
let coin;
let scoreShow;
let playing = true;
let offset = 2;
let player;
var socket;
let enemy;
let enemyReady = false;
let clicked = false;

let screenWidth = 1500;
let screenHeight = 1000;

let coinx = screenWidth;
let coiny = screenHeight/2;
let coinWidth = 75;
let coinHeight = 25;

function setup() {
  createCanvas(screenWidth, screenHeight);
  //frameRate(60);
  score = 0;
  player = new Plane(noise(((0.1*width/2))*0.02, 0.02)*1000+20 -50,width/2,"PBOI", mic, loadImage('planefinal.png'));
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

let noiseScale=0.02;
let viewportOffset = 0;
let xpos =0;

function draw() {
  background(220);
  if (getAudioContext().state == 'running' && playing && enemyReady) {
    //socket.emit('pos',player);

    //---------------------------UPDATE START-------------------------------

    image(enemy.img,((width/2)-(xpos-enemy.x))-20,enemy.y -20,40,40);

    player.mic = mic;
    player.update();
    coin.draw();
    //coin.update();

    generateTerrain();
    collision();
    //socket.emit('pos',player);
    scoreUpdate();

    xpos += (player.planeSpeed+player.speedMulti)*(deltaTime/50);
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

//-----------------------------------------FUNCTIONS------------------------

function generateTerrain(){
  let xi = 0;
  for (let x=0; x < width; x++) {
    xi += 0.1;
    let noiseVal = noise((xi+xpos)*noiseScale, noiseScale);
    line(x, noiseVal*500-100, x, -height);
    line(x, noiseVal*1100+200, x, height);
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
  if(player.y > noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*1100+200 ||
     player.y < noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*500-100){
       //-----------------CODE RUNS WHEN PLAYER DIES-----------------------------
       socket.emit('death');
        player.y = noise(((0.1*width/2))*noiseScale, noiseScale)*1100+200 -50;
        if(noise(((0.1*width/2))*noiseScale, noiseScale)*1100+200 -100 > height){
          player.y = height-50;
        }
    score = 0;
    player.planeSpeed = 0.3;
    xpos = 0;
    scoreEnemy++;
  }
  if(coinx-xpos * 10 + coinWidth> coinx/2 - 20 && coinx-xpos * 10 < coinx/2 + 20){
    console.log("midden");
    if(coiny > player.y - offset && coiny < player.y + offset){
      console.log("money");
    }
 }
 var pos = {
   x:xpos,
   y:player.y
 };
 socket.emit('pos',pos);
}

function scoreUpdate(){
  if(Math.round(xpos)<Math.round(enemy.x)){
    fill(0, 0, 255);
  }else{
    fill(255, 0, 0);
  }
  rect(0, 0, width, 40);
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
