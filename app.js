const canvas = document.getElementById("canvas");
const livesTag = document.getElementById("lives");
const ctx = canvas.getContext("2d");
let lives = 3;
degToRad = (deg) => {
    let rad = ((deg*Math.PI)/180);
    return rad;
}
radToDeg = (rad) => {
    let deg = ((rad*180)/Math.PI);
    return deg;
}




const brickHeight = 20;
const brickWidth = 50;
const brickPadding = 10;
const brickRows = Math.floor(canvas.width/(brickWidth+brickPadding));
const brickCol = Math.floor((canvas.height/(brickHeight+brickPadding))/2.5);
const bricks = [];
for(let x = 0; x<brickRows; x++){
    for(let y = 0; y<brickCol; y++){
        bricks.push(new Brick(x*(brickWidth+brickPadding)+brickPadding,y*(brickHeight+brickPadding)+brickPadding,brickWidth,brickHeight,brickCol-y-1))
    }
}


const paddleWidth = 100;
const paddleHeight = 8;
const paddleFloat = 5;
const paddle = new Paddle(290,canvas.height-paddleHeight-paddleFloat,paddleWidth,paddleHeight);
const balls = [new Ball(-45,5)];

drawBricks = () => {
    for(let i = 0; i<bricks.length; i++){
        bricks[i].draw();
    }
}

let moreBricks = true;


moveBalls = () => {
    for(let i = 0; i<balls.length; i++){
        balls[i].move(bricks,paddle);
    }
}
run = () => {
    moreBricks = false;
    livesTag.innerHTML = "Lives: "+lives;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    moveBalls();
    drawBricks();
    paddle.move();
    if(lives<1){
        alert("game over!")
        document.location.reload();
    }
    if(! moreBricks){
        alert("winner!")
        document.location.reload();
        
    }
    requestAnimationFrame(run);
}

run();
