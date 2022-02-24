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


// 初始化录制
let autoDownloadFile = true

//set to no download at the end
let rec = new p5.Recorder(autoDownloadFile);

let options = {
    filename: "dynamic_new_year_letter.webm",
    recordAudio: false,
    audioBitRate: 128000,
    videoBitRate: 100000000, //10 megabits
    fps: 60,
}

let baocun = document.getElementById('download-video-button')
baocun.addEventListener('click', function() {
    rec.stop();
})

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
    stroke(245, 245, 125, this.opacity)
    strokeWeight(this.r)
    line(this.x, this.y, this.oldX, this.oldY)
        // resetMatrix();
}

//更新node
Noodle.prototype.update = function() {
    // this.r = this.r + sin(this.timepast)
    this.opacity = sin(this.timepast) * 200 + 100
    this.timepast += 0.015
        // console.log(this.opacity)
}

// let kanwasi

function setup() {
    frameRate(60)
    pixelDensity(1)
    let cnv = createCanvas(windowWidth, windowHeight)
    cnv.parent(select('section.canvas'))
    cnv.id('huabu')
    kanwasi = document.getElementById('huabu')
        // console.log(`sss: ${kanwasi}`)
    let x = y = oldX = oldY = 0


}

//画
function draw() {
    frameRate(60)
    background(12, 12, 12, 255)

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

    } else if (f) {
        ax = ay = 0
        f = false
    }

    //更新noodle
    for (let i = 0; i < objs.length; i++) {
        objs[i].drawing()
        objs[i].update()
    }

    //开始录像
    if (objs.length === 10) {
        rec.start(options)
        console.log(1)
    }

}
