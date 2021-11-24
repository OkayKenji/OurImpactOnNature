let backgroundImg;
let img1;
let blur;

function preload() {
    backgroundImg = loadImage('images/uae/uae2000.jpg');
    img1 = loadImage('images/uae/uae2020.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //createCanvas(backgroundImg.width, backgroundImg.height);
    
    background(backgroundImg);

    //create a blurry line
    blurredLinesWeirdAlsVersion();

    blend(img1,0,0,map(100,0,width,0,img1.width),img1.height,0,0,100,height,NORMAL);
    image(blur,100-blur.width/2,0);
    slider(100);
}

function mouseDragged() {
    background(backgroundImg);
    let arg = parseInt(mouseX);
    if (arg < 0) {
        drawOverlay(0)
    } else if ( arg < width) {
        drawOverlay(arg);
    } else {
        drawOverlay(width);
    }
}

function drawOverlay(xPos) {
    let arg = xPos;
    //map(arg,0,width,0,img1.width);
    blend(img1,0,0,map(arg,0,width,0,img1.width),img1.height,0,0,arg,height,NORMAL);
    image(blur,arg-blur.width/2,0);
    slider(arg);
}

function blurredLinesWeirdAlsVersion() {
    blur = createImage(30,height);
    blur.loadPixels();
    for (let i = 0 ; i < blur.width ; i++) {
        let transprancy = map(Math.abs((blur.width/2)-i),0,blur.width/2,255,0);
        for (let j = 0 ; j < blur.height ; j++) {
            blur.set(i,j,color(255,180,0,transprancy));
        }
    }   
     blur.updatePixels();
}

function slider(xLoc) {
    noStroke();
    fill(255,180,0)
    circle(xLoc,height/2,50);
    fill(50);
    stroke(1);
    circle(xLoc,height/2,30);
}