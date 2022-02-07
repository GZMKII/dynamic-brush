////////////////////////////////////////////
//Global Variable
////////////////////////////////////////////
var objs = [];
var btns = [];
var FPS = 60;
var timepast = 0;
var R = 200;
var G = 150;
var B = 50;
var bR = 0;
var bG = 0;
var bB = 50;
var eraserRange = 20;
var timerRange = 50;
var brushType = "CIRCLE";
var pbrushType = "CIRCLE";
var isPlaying = true;
var isMenuHide = false;


////////////////////////////////////////////////////////////////////////
//Node
////////////////////////////////////////////////////////////////////////
//画笔节点
function Node(position, givenSize, givenR, givenG, givenB) {
    this.R = givenR;
    this.G = givenG;
    this.B = givenB;
    this.position = createVector(position.x, position.y);
    this.position.x += (random(20) - 10);
    this.position.y += (random(20) - 10);
    this.size = createVector(0, 0);
    this.sizeScale = 0.5;
    var randomSize = givenSize / 2 + random(10);
    this.baseSize = createVector(randomSize, randomSize);
    this.timepast = 0;
    this.isPlaying = isPlaying;
    this.rotateAngle = random(2 * PI);
    this.shapeType = brushType;
    this.pmouseX = pmouseX;
    this.pmouseY = pmouseY;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
}


//drawing方法用来画下节点
Node.prototype.drawing = function() {
    //圆形画笔
    translate(this.position.x, this.position.y);
    fill(this.size.x * this.R / 10, this.size.x * this.G / 10, this.size.x * this.B / 10, round(sin(this.timepast) * 128));
    ellipse(sin(this.timepast) * this.baseSize.x, cos(this.timepast) * this.baseSize.y, this.size.x * 1.25, this.size.y * 1.25);
    fill(this.size.x * this.R / 10, this.size.x * this.G / 10, this.size.x * this.B / 10, 255);
    ellipse(sin(this.timepast) * this.baseSize.x, cos(this.timepast) * this.baseSize.y, this.size.x, this.size.y);
    resetMatrix();
}

//update方法用来更新
Node.prototype.update = function() {
    this.size = createVector(this.baseSize.x + sin(this.timepast) * this.baseSize.x * this.sizeScale,
        this.baseSize.y + sin(this.timepast) * this.baseSize.y * this.sizeScale);
    if (this.isPlaying) {
        this.timepast += 1 / FPS;
    }
}

function setup() {
    frameRate(FPS)
    createCanvas(600, 600)
}

function draw() {
    background(bR, bG, bB);
    noStroke()
    timepast += 1 / FPS

    //draw一些东西
    if (mouseIsPressed) {
        var position = createVector(mouseX, mouseY)
        objs.push(new Node(position, sqrt(sq(mouseX - pmouseX) + sq(mouseY - pmouseY)), R, G, B))
    }

    for (var i = 0; i < objs.length; i++) {
        objs[i].drawing()
        objs[i].update()
    }

    //canvas
    fill(R * 1.5, G * 1.5, B * 1.5);
    stroke(R * 1.5, G * 1.5, B * 1.5);
    ellipse(mouseX, mouseY, 10, 10);
}