const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

const ball = new Ball(-45,3);

drawBricks = () => {
    for(let i = 0; i<bricks.length; i++){
        bricks[i].draw();
    }
}

run = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ball.move(bricks);
    drawBricks();
    requestAnimationFrame(run);
}

run();
