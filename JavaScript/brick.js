
Brick = class{
    constructor(x,y,w,h,l){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.l = l;
        this.bound = [];
        this.colors = ["red","orange","yellow","green","blue","purple"]
        this.color = this.colors[this.l];
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
            moreBricks = true;
            this.color = this.colors[this.l];
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.w,this.h);
        }
    }
}