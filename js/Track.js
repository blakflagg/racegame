const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROW = 15;
const TRACK_GAP = 2;



var trackGrid = [
    5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5
  , 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 3, 3, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 1, 3, 1, 0, 0, 1, 3, 3, 1, 0, 0, 0, 1
  , 1, 0, 0, 1, 0, 0, 0, 1, 3, 1, 0, 0, 1, 3, 3, 1, 0, 0, 0, 1
  , 1, 0, 2, 1, 0, 0, 0, 1, 3, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1
  , 1, 1, 1, 1, 0, 0, 0, 1, 3, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1
  , 1, 4, 0, 0, 0, 0, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 1, 4, 0, 0, 0, 0, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5
];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_TREE = 3;
const TRACK_GOAL = 4;
const TRACK_WALL_FLAG = 5;



drawTracks = () => {
    for (var eachRow = 0; eachRow < TRACK_ROW; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if (trackGrid[arrayIndex] == TRACK_WALL) {
                canvasContext.drawImage(wallPic,TRACK_W * eachCol, TRACK_H * eachRow)

            }else if(trackGrid[arrayIndex] == TRACK_ROAD){
              canvasContext.drawImage(roadPic,TRACK_W * eachCol, TRACK_H * eachRow)
            }else if(trackGrid[arrayIndex] == TRACK_GOAL){
              canvasContext.drawImage(goalPic,TRACK_W * eachCol, TRACK_H * eachRow)
            }else if(trackGrid[arrayIndex] == TRACK_TREE){
              canvasContext.drawImage(treePic,TRACK_W * eachCol, TRACK_H * eachRow)
            }else if(trackGrid[arrayIndex] == TRACK_WALL_FLAG){
              canvasContext.drawImage(flagPic,TRACK_W * eachCol, TRACK_H * eachRow)
            }
        }
    }
}

function isObstacleAtColRow(col, row) {

    if (col >= 0 && col < TRACK_COLS &&
        row >= 0 && row < TRACK_ROW) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord] != TRACK_ROAD);
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

          if(isObstacleAtColRow(carTrackCol,carTrackRow )){
            carX -= Math.cos(carAng) * carSpeed;
            carY -= Math.sin(carAng) * carSpeed;

            carSpeed *= -0.3;
        }
    }
  }

  rowColToArrayIndex = (col, row) => {
      return col + TRACK_COLS * row;

  }

  trackGridReset = () => {

      for (var i = 0; i <= TRACK_COLS * TRACK_ROW; i++) {
          trackGrid[i] = true;
      }
  }