class Plane{
  constructor(y,x,name,mic,img){
    this.y = y;
    this.x = x;
    this.name = name;
    this.planeSpeed = 1.3;
    this.mic = mic;
    this.img = img;
    this.speedMulti = 0;
  }
  update(){
      let micLevel = this.mic.getLevel();

      //-----------------INPUT------------------------------------------------------
      if(keyIsPressed){
        this.y -= 3;
        this.speedMulti = 0;
      }
      if(micLevel > 0.23){
        if(this.y>0)
          this.y -= 10 * micLevel;
          this.speedMulti = 0;
      }else{
        if(this.y<height&&!keyIsPressed)
          this.y +=3;
          this.speedMulti = 0.7;
      }
      image(this.img,width/2 - 20,this.y -20,40,40);
    //if(this.planeSpeed < 3){
      this.planeSpeed = this.planeSpeed + 0.002*(deltaTime / 50);
    //}
  }
  collision(xpos){
    noiseSeed(69);
    if(this.y > noise(((0.1*width/2)+xpos)*0.4, 0.4)*700+50 ||
       this.y < noise(((0.1*width/2)+xpos)*0.4, 0.4)*300-100){
         //CODE RUNS WHEN PLAYER DIES-----------------------------------------------
          this.y = noise(((0.1*width/2))*0.04, 0.04)*700+50 -100;
          if(noise(((0.1*width/2))*0.04, 0.04)*700+50 -100 > height){
            //this.y = height-200;
          }
          this.y = height/2;
          console.log("die");
          this.planeSpeed = 0.3;
    }
  }
  draw(){
    image(this.img,width/2 - 20,this.y -20,40,40);
  }
}
