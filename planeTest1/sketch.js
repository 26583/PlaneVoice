let mic;
let h;
let img;
let score;
let scoreShow;
let playing = true;

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
  h = height;
  img = loadImage('planefinal.png');
  score = 0;
}

let noiseScale=0.04;
let xpos = 0;
let planeSpeed = 0.3;

function draw() {
  background(220);
if (getAudioContext().state == 'running' && playing) {
  console.log(score);
  planeController();
  timer();
  //TERRAIN GENERATION
  if(planeSpeed <3){
  planeSpeed = planeSpeed + 0.0001;
}
  let xi = 0;
  for (let x=0; x < width; x++) {
    xi += 0.1;
    let noiseVal = noise((xi+xpos)*noiseScale, noiseScale);
    line(x, noiseVal*300-100, x, -height);
    line(x, noiseVal*700+50, x, height);
  }

  fill(191, 249, 255);
  rect(0, 0, 50+score/1.3, 40);
  fill(255,255,255);
  textSize(32);
  fill(0,0,0);
  text(scoreShow, 10, 30);
  if(50+score/1.3 >= width){
    playing = false;
  }

  //COLLISION---------------------------------------------------------------------------------------
  if(h > noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*700+50 ||
     h < noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*300-100){
       //CODE RUNS WHEN PLAYER DIES-----------------------------------------------
        h = noise(((0.1*width/2))*noiseScale, noiseScale)*700+50 -100;
        if(noise(((0.1*width/2))*noiseScale, noiseScale)*700+50 -100 > height){
          h = height-200;
        }
    score = 1;
    planeSpeed = 0.3;
    xpos = 0;
  }

}else{
  if(playing){
  textSize(32);
  text('CLICK TO PLAY', width/2-120, height/2);
  fill(0, 102, 153);
}else{
  textSize(32);
  text('YOU WIN', width/2-120, height/2);
  fill(0, 102, 153);
}
 }
}
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    console.log("resume");
  }
  mic = new p5.AudioIn();
  mic.start();
}

function planeController(){
  micLevel = mic.getLevel();
  if(micLevel > 0.23){
    if(h>0)
      h -= 10 * micLevel;
  }else{
    if(h<height)
      h +=3;
  }
  //ellipse(width/2, h, 20, 20);
  image(img,width/2 - 20,h -20,40,40);
  xpos += planeSpeed;
}

function timer(){
  score += 0.1*planeSpeed;
  scoreShow = round(score);
}
