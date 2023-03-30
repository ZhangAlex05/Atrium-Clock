let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];//week array
let particles = [];//Meteor array

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
//Clock decare variables -1
  let hr = hour();
  let mn = minute();
  let sc = second();
  let d = new Date();
  let day = weekdays[d.getDay()];

//On time :  background color change（7）
  if (hr >= 7 && hr < 19){
    background(250);
  }else {
    background(5);
  }
  //
  push();
  translate(width /2, height /2 -70); //定点时钟
  //时钟不够大的话在下面加scale（倍数）；
 

//Clock decare variables -2
  let hrAngle = map(hr % 12, 0, 12, 0, 360);
  let mnAngle = map(mn, 0, 60, 0, 360);
  let scAngle = map(sc, 0, 60, 0, 360);
  let hrProgress = map((hr %12)*60 +mn, 0, 12*60, 0, 360);

  drawProgressBars(hrProgress, mnAngle, scAngle);
  drawClockBorderAndTicks();
  drawClockHands(hrAngle, mnAngle, scAngle);

//On time :  text color change
  if (hr >= 7 && hr < 19){
    fill(5);
  }else {
    fill(250);
  }
//set Text: Week & date
  noStroke();
  textSize(35);
  textAlign(CENTER, CENTER);
  text(day, 0, 320);//week loc
  textSize(25);
  text(nf(d.getDate(), 2) + '/' + nf(d.getMonth() +1, 2) + '/' + d.getFullYear(), 0, 350);//data loc
  pop();

//draw Meteor shower
  for (let i = particles.length -1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.isOffScreen()) {
      particles.splice(i, 1);
    }
  }
}
//Interaction- press “space” 
function keyPressed() {
  if (key === ' ') {
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle());
    }
  }
}
//Input "Falling" 
class Particle {
  constructor() {
    this.pos = createVector(random(width),0);
    this.vel = createVector(random(-1, 1), random(1,3));
    this.acc = createVector(0, 0.05);
    this.size = random(5, 15);
    this.color = color(255, 165, 0, 200);
  }
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
  isOffScreen() {
    return this.pos.y > height || this.pos.x < 0 || this.pos.x > width;
  }
}



  ////Progress bar 
function drawProgressBars(hrProgress, mnAngle, scAngle) {
  let progressBarWidth = 13;
  let morandiGreen = [
    color(124, 170, 142),
    color(143, 188, 150),
    color(163, 207, 159), 
  ];
  // H
  drawProgressBar(190, hrProgress, morandiGreen[0], progressBarWidth);
  // Min
  drawProgressBar(175, mnAngle, morandiGreen[1], progressBarWidth);
  // Sec
  drawProgressBar(160, scAngle, morandiGreen[2], progressBarWidth);
}
function drawProgressBar(radius, angle, color, width) {
  stroke(color);
  strokeWeight(width);
  noFill();
  arc(0, 0, radius * 2 +100, radius * 2 +100, -90, angle -90);
}

//Draw clock boundary and scale
function drawClockBorderAndTicks() {
  stroke(0);
  strokeWeight(4);
  noFill();
  ellipse(0, 0, 400, 400);

  for (let i = 0; i < 60; i++){
    push();
    rotate(i*6);
   if(i %5 === 0){
    strokeWeight(4);
    line(180, 0, 200, 0);//Sec scale
  } else {
    strokeWeight(2);
    line(190, 0, 200, 0);//Min scale
  }
  pop();
  }
}

//Draw Clock Hands
function drawClockHands(hrAngle, mnAngle, scAngle) {
  let hourHandLength = 130;
  let minuteHandLength = 155;
  let secondHandLength = 170;
  let morandiGreen = [
    //progressive color
    color(163, 207, 159),
    color(143, 188, 150),
    color(124, 170, 142)
  ];

  push();
  stroke(morandiGreen[0]); // Set H hand color
  rotate(hrAngle -90);
  strokeWeight(6);
  line(0, 0, hourHandLength, 0);
  pop();

  push();
  stroke(morandiGreen[1]); // Set Min hand color
  rotate(mnAngle -90);
  strokeWeight(4);
  line(0, 0, minuteHandLength, 0);
  pop();

  push();
  stroke(morandiGreen[2]); // Set Sec hand color
  rotate(scAngle -90);
  strokeWeight(2);
  line(0, 0, secondHandLength, 0);
  pop();
}

