class Coin{
    constructor(x,y,img,width,heigth){
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = width;
        this.heigth = heigth;
        this.coinTaken = false;
    }
    update() {
        
    }
    draw(){
        image(this.img, this.x-xpos*10, this.y/2, this.width, this.heigth);
    }
}