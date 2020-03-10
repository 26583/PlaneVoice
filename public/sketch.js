let mic;
let score;
let scoreShow;
let playing = true;
let player;
var socket;
let enemy;

function setup() {
  createCanvas(400, 400);
  score = 0;
  player = new Plane(height,"PBOI", mic, loadImage('planefinal.png'));
  enemy = new Plane(height,"PBOI", null, loadImage('planefinalblauw.png'));
  socket = io.connect('http://localhost:5000');
  socket.on('pos',drawEnemys);
  socket.on('death',restart);
}

let noiseScale=0.04;
let viewportOffset = 0;
let xpos =0;

function draw() {
  background(220);
  if (getAudioContext().state == 'running' && playing) {
    //socket.emit('pos',player);
    //---------------------------UPDATE START------------------------------
    player.mic = mic;
    enemy.draw();
    player.update();
    xpos += player.planeSpeed;
    generateTerrain();
    collision();
    scoreUpdate();
    timer();
    //socket.emit('pos',player);

    //--------------------------UPDATE END----------------------------------
  }else{
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
  noiseSeed(99);
  let xi = 0;
  for (let x=0; x < width; x++) {
    xi += 0.1;
    let noiseVal = noise((xi+xpos)*noiseScale, noiseScale);
    line(x, noiseVal*300-100, x, -height);
    line(x, noiseVal*700+50, x, height);
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
  socket.emit('start');
}

function collision(){
  if(player.y > noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*700+50 ||
     player.y < noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*300-100){
       //CODE RUNS WHEN PLAYER DIES-----------------------------------------------
       socket.emit('death');
        player.y = noise(((0.1*width/2))*noiseScale, noiseScale)*700+50 -100;
        if(noise(((0.1*width/2))*noiseScale, noiseScale)*700+50 -100 > height){
          player.y = height-200;
        }
    score = 1;
    player.planeSpeed = 0.3;
    xpos = 0;
  }

  socket.emit('pos',player.y);
}

function scoreUpdate(){
  fill(191, 249, 255);
  rect(0, 0, 50+score/1.3, 40);
  fill(255,255,255);
  textSize(32);
  fill(0,0,0);
  text(scoreShow, 10, 30);
  if(50+score/1.3 >= width){
    playing = false;
  }
}
function timer(){
  score += 0.1*player.planeSpeed;
  scoreShow = round(score);
}
function drawEnemys(y){
  enemy.y = y;
}
function restart(){
  score = 1;
  player.planeSpeed = 0.3;
  xpos = 0;
  player.y = noise(((0.1*width/2))*noiseScale, noiseScale)*700+50 -100;
  if(noise(((0.1*width/2))*noiseScale, noiseScale)*700+50 -100 > height){
    player.y = height-200;
  }
}
