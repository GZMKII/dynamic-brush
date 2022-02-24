let objs = []
let timepast = 0
let brushSize = 40
let f = false
let spring = 0.4
let friction = 0.45
let v = 0.5
let r = 0
let vx = 0
let vy = 0
let splitNum = 10
let diff = 8
let size = 15
let opacity = 255

// var luzhi =  document.getElementById('start-capturing-button')



// var baocun = document.getElementById('download-video-button')
// baocun.addEventListener('click', function() {
//     capturer.stop()
//     capturer.save()
// })
// let capturer = new CCapture({
//     format: 'webm',
//     framerate: 30,
// })




// luzhi.addEventListener('click', function(){

// 	capturer.start()
// })


//创建node
function Noodle(x, y, oldX, oldY, oldR, opacity) {
    // this.position = createVector(position.x, position.y)
    this.x = x
    this.y = y
    this.oldX = oldX
    this.oldY = oldY
    this.r = oldR
    this.timepast = 0
    this.opacity = opacity
}

//绘画方法
Noodle.prototype.drawing = function() {
    stroke(12, 12, 12, this.opacity)
    strokeWeight(this.r)
    line(this.x, this.y, this.oldX, this.oldY)
        // resetMatrix();
}

//更新node
Noodle.prototype.update = function() {
    // this.r = this.r + sin(this.timepast)
    this.opacity = sin(this.timepast) * 200 + 100
    this.timepast += 0.03
        // console.log(this.opacity)
}

function setup() {
    frameRate(60)
    let cnv = createCanvas(windowWidth, windowHeight)
    cnv.id('huabu')
    let x = y = oldX = oldY = 0
    enableCapture({
        frameCount: 360,
        onComplete: function() { noLoop() }
    });

}


//画
function draw() {
    background(200, 12, 12, 255)
        // debugger
        // timepast += 1
        // requestAnimationFrame(draw)
        // debugger



    if (mouseIsPressed) {
        if (!f) {
            f = true
            x = mouseX
            y = mouseY
        }
        vx += (mouseX - x) * spring
        vy += (mouseY - y) * spring
        vx *= friction
        vy *= friction

        v += sqrt(vx * vx + vy * vy) - v
        v *= 0.6

        oldR = r;
        r = size - v

        for (let i = 0; i < splitNum; ++i) {
            oldX = x;
            oldY = y;
            x += vx / splitNum;
            y += vy / splitNum;
            oldR += (r - oldR) / splitNum;

            if (oldR < 2) {
                oldR = 2
            }
            objs.push(new Noodle(x, y, oldX, oldY, oldR))
        }

        // capturer.start();


    } else if (f) {
        ax = ay = 0
        f = false
    }

    //更新noodle
    for (let i = 0; i < objs.length; i++) {
        objs[i].drawing()
        objs[i].update()
    }

    // capturer.capture(canvas)
    // document.getElementById('huaban')
    // console.log(capturer.capture(canvas))
    captureFrame()

}
