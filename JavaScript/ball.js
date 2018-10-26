Ball = class{
    constructor(a){
        this.angle=-120;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.v = 3;
        this.vx = this.v * Math.cos(degToRad(this.angle));
        this.vy = this.v * Math.sin(degToRad(this.angle));
        this.r = 10;
        this.color = "blue";
        this.bound = []
        for(let x = 0; x<360; x++){
            this.bound.push({x: this.r * Math.cos(degToRad(x)), y: this.r * Math.sin(degToRad(x))})
        }
    }


    move(bricks){
        for(let i = 0; i<bricks.length; i++){
            this.collision(bricks[i]);
        }
        this.vx = this.v * Math.cos(degToRad(this.angle));
        this.vy = this.v * Math.sin(degToRad(this.angle));
        this.x+=this.vx;
        this.y+=this.vy;
        this.draw()
        this.bound = []
        for(let x = 0; x<360; x++){
            this.bound.push({x: this.r * Math.cos(degToRad(x))+this.x, y: this.r * Math.sin(degToRad(x))+this.y})
        }
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        for(let x = 0; x<360; x++){
            this.bound.push({x: this.r * Math.cos(degToRad(x))+this.x, y: this.r * Math.sin(degToRad(x))+this.y})
        }
    }

    wallCollision() {
        if(this.x+this.r>canvas.width || this.x-this.r<0){
            let reflect = 90-this.angle;
            this.angle=90-(reflect*-1);


        }

        if(this.y+this.r>canvas.height || this.y-this.r<0){
            this.angle*=-1;
        }
    }


    collision(brick){
        this.wallCollision();
        let points = []
        for(let i in this.bound){
            let point = this.bound[i];
            if(!(point.x < brick.x || point.y < brick.y || point.x > brick.x + brick.w || point.y > brick.y+brick.h)){
                points.push(point);
            }
        }
        let contact = points[Math.floor(points.length/2)]
        if(contact!=undefined){
            let xVector = this.x-contact.x;
            let yVector = this.y-contact.y;
            let bounceA = radToDeg(Math.atan(yVector/xVector));
            let bounceX = this.v * Math.cos(degToRad(bounceA));
            let bounceY = this.v * Math.sin(degToRad(bounceA));
            console.log(bounceX,bounceY, this.vx, this.vy)
            xVector = this.vx + 2*this.vx*(0-(bounceX/this.v));
            yVector = this.vy + 2*this.vy*(0-(bounceY/this.v));
            console.log(xVector,yVector)



            this.angle = radToDeg(Math.atan(yVector/xVector));
            this.vx = this.v * Math.cos(degToRad(this.angle));
            this.vy = this.v * Math.sin(degToRad(this.angle));
            
            console.log(this.angle);
            //            this.angle=bounceA;
            console.log("")
        }

    }







}