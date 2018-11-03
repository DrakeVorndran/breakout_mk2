
Ball = class{
    constructor(a,v){
        this.numP = 36;
        this.angle=a;
        this.initialA = a;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.v = v;
        this.setV();
        this.r = 10;
        this.color = "blue";
        this.bound = []
        this.calcBound();
    }

    setV(){
        this.vx = this.v * Math.cos(degToRad(this.angle));
        this.vy = this.v * Math.sin(degToRad(this.angle));
    }


    calcBound(){
        this.bound = []
        for(let x = 0; x<this.numP; x++){
            this.bound.push({x: Math.floor(this.r * Math.cos(degToRad((x/this.numP)*360)))+this.x, y: Math.floor(this.r * Math.sin(degToRad((x/this.numP)*360)))+this.y, a: (x/this.numP)*360})

        }

    }

    checkCollision(bricks,paddle){
        this.ballCollision();
        this.wallCollision();
        this.paddleCollide(paddle);
        for(let i = 0; i<bricks.length; i++){
            this.collision(bricks[i]);
        }
    }

    touching(ball){
        let xDist = this.x-ball.x;
        let yDist = this.y-ball.y;
        if((xDist*xDist)+(yDist*yDist)<(this.r*2)*(this.r*2)){
            return true;
        }
        return false;
    }
    ballCollision(){
        for(let i = 0; i<balls.length; i++){
            if(!(balls[i]===this)){
                if(this.touching(balls[i])){
                    let bounceA = Math.atan((balls[i].y-this.y)/(balls[i].x-this.x));
                    let vector = ((bounceA+180)%360) - this.angle;
                    this.angle = bounceA+vector;
                }
            }
        }
    }




    move(bricks,paddle){

        this.setV();

        this.x+=this.vx;
        this.y+=this.vy;
        this.calcBound();
        this.checkCollision(bricks,paddle);
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

        if(this.y-this.r<0){
            this.angle*=-1;
        }
        if(this.y+this.r>canvas.height){
            let pos = balls.indexOf(this);
            balls.splice(pos,1);
            if(balls.length===0){
                balls.push(new Ball(-45,5))
                lives--;
            }
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
                brick.hit();
                let bounceA = (contact.a+180)%360;
                //            this.angle= bounceA;
                //            console.log(this.vx*Math.cos(degToRad(bounceA)))
                //            this.angle = Math.tan(this.vy/this.vx);
                let vector = contact.a - this.angle;
                this.angle = bounceA+vector;



            }

        }
    }

    paddleCollide(brick){
        if(this.y+this.r>brick.y && this.x>brick.x && this.x<brick.x+brick.w){
            this.angle*=-1;
            this.angle+=brick.v;
            this.y = brick.y-this.r
            this.calcBound();
        }
    }







}