let backgroundImgs;
let imgs;
let blur;
let jsonData;
let index = 0;
let xLoc = 0;

function preload() {
    backgroundImgs = [loadImage('../images/uae/uae2000.jpg'),loadImage('../images/aralsea/AralSea1973.jpg'),loadImage('../images/mahia/Mahia2007.jpg')];
    imgs = [loadImage('../images/uae/uae2020.jpg'),loadImage('../images/aralsea/AralSea2021.jpg'),loadImage('../images/mahia/Mahia2021.jpg')];
    jsonData = loadJSON('f.json');
}

function setup() {
    let canvs = createCanvas(windowWidth * (3.75/5),backgroundImgs[0].height* ((windowWidth * (3.75/5)) / (backgroundImgs[index].width) ));
    
    canvs.parent("canvasCard");

    background(backgroundImgs[index]);

    //create a blurry line
    blurredLinesWeirdAlsVersion();
}

function draw() {
    xLoc+=1;
    if (xLoc > width) {
        xLoc = 0;
        index++;
        if (index>=backgroundImgs.length) {
            index = 0;
        }

        let x = document.getElementById("mapImg");
        x.setAttribute("src",jsonData.metadata[index].map);
    }
    animate();
}

function blurredLinesWeirdAlsVersion() {
    blur = createImage(10,parseInt(height));
    blur.loadPixels();
    for (let i = 0 ; i < blur.width ; i++) {
        let transprancy = map(Math.abs((blur.width/2)-i),0,blur.width/2,255,0);
        for (let j = 0 ; j < blur.height ; j++) {
           blur.set(i,j,color(255,255,255,transprancy));
        }
    }   
    blur.updatePixels();
}

function animate() {
    background(backgroundImgs[index]);
    let arg = xLoc;
    if (arg < 0) {
        drawOverlay(0)
    } else if ( arg < width) {
        drawOverlay(arg);
    } else {
        drawOverlay(width);
    }
}

function drawOverlay(xPos) {
    let arg = parseInt(xPos);
    blend(imgs[index],0,0,parseInt(map(arg,0,width,0,imgs[index].width)),imgs[index].height,0,0,arg,height,NORMAL);
    image(blur,parseInt(arg-blur.width/2),0);
}
