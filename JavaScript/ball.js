
Ball = class{
    constructor(a){
        this.angle=a;
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

        this.draw()
        this.vx = this.v * Math.cos(degToRad(this.angle));
        this.vy = this.v * Math.sin(degToRad(this.angle));
        this.x+=this.vx;
        this.y+=this.vy;

        this.bound = []
        for(let x = 0; x<36; x++){
            this.bound.push({x: this.r * Math.cos(degToRad(x*10))+this.x, y: this.r * Math.sin(degToRad(x*10))+this.y})
        }
        for(let i = 0; i<bricks.length; i++){
            this.collision(bricks[i]);
        }
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        for(let x = 0; x<36; x++){
            this.bound.push({x: this.r * Math.cos(degToRad(x*10))+this.x, y: this.r * Math.sin(degToRad(x*10))+this.y})
        }
        for(let i in this.bound){
            ctx.fillStyle = "black";
            ctx.fillRect(this.bound[i].x,this.bound[i].y,1,1)
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
        let contact = 0;
        if(points.includes(this.bound[0])){
            contact = points[0]
        }
        else{
            contact = points[Math.floor(points.length/2)]
        }
        if(contact!=undefined){
            console.log(points);
            console.log(this.x,this.y);
            let xVector = this.x-contact.x;
            let yVector = this.y-contact.y;
            console.log(xVector,yVector)
            let bounceA = radToDeg(Math.atan(yVector/xVector));
            if(String(bounceA)==="-0"){
                bounceA = 180;
            }
            let bounceX = this.v * Math.cos(degToRad(bounceA));
            let bounceY = this.v * Math.sin(degToRad(bounceA));
            this.angle=(radToDeg(Math.atan(bounceY/bounceX)))

            console.log(String(bounceA));
            //            this.angle=bounceA;
            console.log("")
        }

    }







}