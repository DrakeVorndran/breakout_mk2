
Ball = class{
    constructor(a,v){
        this.numP = 36;
        this.angle=a;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.v = 2;
        this.vx = this.v * Math.cos(degToRad(this.angle));
        this.vy = this.v * Math.sin(degToRad(this.angle));
        this.r = 10;
        this.color = "blue";
        this.bound = []
        this.calcBound();
    }


    calcBound(){
        this.bound = []
        for(let x = 0; x<this.numP; x++){
            this.bound.push({x: Math.floor(this.r * Math.cos(degToRad((x/this.numP)*360)))+this.x, y: Math.floor(this.r * Math.sin(degToRad((x/this.numP)*360)))+this.y, a: (x/this.numP)*360})

        }

    }

    checkCollision(bricks){
        this.wallCollision();
        for(let i = 0; i<bricks.length; i++){
            this.collision(bricks[i]);
        }
    }


    move(bricks){

        this.vx = this.v * Math.cos(degToRad(this.angle));
        this.vy = this.v * Math.sin(degToRad(this.angle));
        this.x+=this.vx;
        this.y+=this.vy;
        this.calcBound();
        this.checkCollision(bricks);

        this.draw()

    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

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
        if(brick.solid){
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
                brick.l--;
                let bounceA = (contact.a+180)%360;
                //            this.angle= bounceA;
                //            console.log(this.vx*Math.cos(degToRad(bounceA)))
                //            this.angle = Math.tan(this.vy/this.vx);
                let vector = contact.a - this.angle;
                this.angle = bounceA+vector;



            }

        }
    }







}