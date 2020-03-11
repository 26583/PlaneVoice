class Coin{
    constructor(x,y,img,width,heigth,h){
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = width;
        this.heigth = heigth;
        this.h = h;
        this.coinIndex = 0;
    }
    update() {
        if(this.x-xpos * 10 + this.width> this.x/2 - 20 && this.x-xpos * 10 < this.x/2 + 20){
          console.log("midden");
          /*console.log(this.heigth);
          console.log(this.h);*/
          if(this.y - this.width > this.heigth -20 && this.y < this.heigth +20){
            console.log("money");
          }
       }
    }
    draw(){
        image(this.img, this.x-xpos*10, this.y/2, this.width, this.heigth);
    }
}