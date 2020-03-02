let mic;
let h;
let img;
function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
  h = height;
  img = loadImage('planefinal.png');
}

let noiseScale=0.04;
let xpos = 0;

function draw() {
  background(220);
if (getAudioContext().state == 'running') {
  planeController();
  //TERRAIN GENERATION
  let xi = 0;
  for (let x=0; x < width; x++) {
    xi +=0.1;
    let noiseVal = noise((xi+xpos)*noiseScale, noiseScale);
    line(x, noiseVal*300-100, x, -height);
    line(x, noiseVal*700+50, x, height);
  }
  if(h > noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*700+50 ||
     h < noise(((0.1*width/2)+xpos)*noiseScale, noiseScale)*300-100){
        h = noise(((0.1*width/2))*noiseScale, noiseScale)*700+50 -100;
        if(noise(((0.1*width/2))*noiseScale, noiseScale)*700+50 -100 > height){
          h = height-200;
        }
    xpos = 0;
  }
}else{
  textSize(32);
  text('CLICK TO PLAY', width/2-120, height/2);
  fill(0, 102, 153);
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
  xpos +=0.2;
}
