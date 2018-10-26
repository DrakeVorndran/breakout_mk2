Brick = class{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
        this.bound = [];
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
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        for(let i in this.bound){
            ctx.fillStyle = "black";
            ctx.fillRect(this.bound[i].x,this.bound[i].y,1,1);
        }
    }
}