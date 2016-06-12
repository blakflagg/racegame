var canvas;
var canvasContext;
var carPic = document.createElement("img");
var carPicLoaded = false;


const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROW = 15;
const TRACK_GAP = 2;

var trackGrid = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  , 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1
  , 1, 0, 2, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1
  , 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1
  , 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;

const KEY_LEFT_ARROW = 37 ;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVER_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.05;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;


var carX = 75;
var carY = 75;

var carSpeed = 0;
var carAng = 0;

var mouseX;
var mouseY;
var gamePaused = false;

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

}

trackGridReset = () => {

    for (var i = 0; i <= TRACK_COLS * TRACK_ROW; i++) {
        trackGrid[i] = true;
    }
}

function keyPressed(evt){
  if(evt.keyCode == KEY_LEFT_ARROW){
    keyHeld_TurnLeft = true;
  }

  if(evt.keyCode == KEY_RIGHT_ARROW){
    keyHeld_TurnRight = true;
  }

  if(evt.keyCode == KEY_UP_ARROW){
    keyHeld_Gas = true;
  }

  if(evt.keyCode == KEY_DOWN_ARROW){
    keyHeld_Reverse = true;
  }

}

function keyReleased(evt){
  if(evt.keyCode == KEY_LEFT_ARROW){
    keyHeld_TurnLeft = false;
  }

  if(evt.keyCode == KEY_RIGHT_ARROW){
    keyHeld_TurnRight = false;
  }

  if(evt.keyCode == KEY_UP_ARROW){
    keyHeld_Gas = false;
  }

  if(evt.keyCode == KEY_DOWN_ARROW){
    keyHeld_Reverse = false;
  }
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d')
    var framesPerSecond = 60;


    setInterval(updateAll, 1000 / framesPerSecond)
    canvas.addEventListener('mousemove', updateMousePos);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup',keyReleased);

    carPic.onload = function(){
      carPicLoaded = true;
    }
    carPic.src = "./Images/player1.png"

    carReset();
}

function updateAll() {
    drawEverything();
    moveEverything();

}

function carReset() {
  for (var eachRow = 0; eachRow < TRACK_ROW; eachRow++) {
      for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

          var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

          if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {

            trackGrid[arrayIndex] = 0;
            carAng = -Math.PI/2;
            carX = eachCol * TRACK_W + TRACK_W/2;
            carY = eachRow * TRACK_H + TRACK_H/2;
          }
}
}
}
rowColToArrayIndex = (col, row) => {
    return col + TRACK_COLS * row;

}


drawTracks = () => {
    for (var eachRow = 0; eachRow < TRACK_ROW; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if (trackGrid[arrayIndex] == TRACK_WALL) {
                colorRect(TRACK_W * eachCol, TRACK_H * eachRow, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, 'blue');
            }
        }
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    //colorCircle(50, 50, 10, 'white');
    if(carPicLoaded){

      drawBitmapWithRotation(carPic,carX,carY,carAng);
    }

    drawTracks();
}

function drawBitmapWithRotation(useBitmap,atX,atY,withAng){
  canvasContext.save();
  canvasContext.translate(atX,atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap,  -useBitmap.width/2, -useBitmap.height/2);
  canvasContext.restore();
}

function carMove() {
   carSpeed *= GROUNDSPEED_DECAY_MULT;
  if(keyHeld_Gas){
    carSpeed += DRIVER_POWER;
    console.log(carSpeed);
  }
  if(keyHeld_Reverse){
    carSpeed -= REVERSE_POWER;
  }
  if(keyHeld_TurnLeft){
    carAng -= TURN_RATE;
  }
  if(keyHeld_TurnRight){
    carAng += TURN_RATE;
  }

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

function isWallAtColRow(col, row) {

    if (col >= 0 && col < TRACK_COLS &&
        row >= 0 && row < TRACK_ROW) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord] == TRACK_WALL);
    } else {
        return false;
    }
}

function carTrackHandling() {
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow)

    if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
        carTrackRow >= 0 &&
        carTrackRow < TRACK_ROW) {

          if(isWallAtColRow(carTrackCol,carTrackRow )){
            carX -= Math.cos(carAng) * carSpeed;
            carY -= Math.sin(carAng) * carSpeed;

            carSpeed *= -0.3;
        }
    }
  }
moveEverything = () => {

    carMove();
    carTrackHandling();

};
colorRect = (leftX, topY, width, height, drawColor) => {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);

};
colorCircle = (x, y, radius, drawColor) => {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(carX, carY, radius, 0, 2 * Math.PI, true)
    canvasContext.fill();
}
colorText = (showWords, textX, textY, fillColor) => {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}
