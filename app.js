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



b = new Ball(0)
b.draw();

brick = new Brick(200,200,50,20);
run = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    b.move([brick]);
    brick.draw();
    requestAnimationFrame(run);
}

run();
