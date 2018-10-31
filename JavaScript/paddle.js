

let rightPressed = false;
let leftPressed = false;

keyDownHandler = (e) => {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

keyUpHandler = (e) => {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }

}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

Paddle = class{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.v = 0;
        this.bound = [];
        this.color = "hsl(210,50%,50%)"
        this.solid = true;

        for(let x = this.x; x<this.x+this.w+1; x++){
            this.bound.push({ x: x, y: this.y});
            this.bound.push({ x: x, y: this.y+this.h});
        }
        for(let y = this.y+1; y<this.y+this.h; y++){
            this.bound.push({ x: this.x, y: y});
            this.bound.push({ x: this.x+this.w, y: y});
        }
    }

    draw(){
        if(this.l<0){
            this.solid = false;
        }
        if(this.solid){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.w,this.h);
        }
    }

    move(){
        if(rightPressed) {
            this.v += .3;
        }
        else if(leftPressed) {
            this.v -= .3;
        }
        this.x += this.v;
        if(!(rightPressed || leftPressed)){
            this.v-=this.v*.02;
        }
        if(this.x < 3){
            this.v = this.v*-.1;
            this.x = 3;
        }
        else if(this.x > canvas.width-(paddleWidth+3)){
            this.v = this.v*-.1;
            this.x = canvas.width-(paddleWidth+3);
        }
        this.draw();
    }
}