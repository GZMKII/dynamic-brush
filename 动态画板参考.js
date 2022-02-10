let objs = []
let timepast = 0

//创建node
function Node(position) {
    this.position = createVector(position.x, position.y)
    this.baseSize = createVector(50, 50)
    this.size = createVector(0, 0)
    this.pmouseX = pmouseX
    this.pmouseY = pmouseY
    this.mouseX = mouseX
    this.mouseY = mouseY
    this.timepast = 0
}

//绘画方法
Node.prototype.drawing = function() {
    translate(0, 0)
    fill(255, 50)
    ellipse(this.position.x, this.position.y, this.size.x, this.size.y)
    resetMatrix();
}

Node.prototype.update = function() {
    this.size = createVector(sin(this.timepast) * 30 + this.baseSize.x, sin(this.timepast) * 30 + this.baseSize.y)
    this.timepast += 0.1
    console.log(this.timepast)

}

//setup
function setup() {
    frameRate(60)
    createCanvas(windowWidth, windowHeight)
}

//画
function draw() {
    background(127, 200)
    noStroke()
    timepast += 1


    //创建node
    if (mouseIsPressed) {
        let position = createVector(mouseX, mouseY)
        objs.push(new Node(position, 50))
    }

    //刷新画笔内容
    for (let i = 0; i < objs.length; i++) {
        objs[i].drawing()
        objs[i].update()

    }
    //在node上绘制图形
    fill(255, 127, 200)
    noStroke()
    ellipse(mouseX, mouseY, 10, 10)
}