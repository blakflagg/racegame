const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROW = 15;
const TRACK_GAP = 2;

var levelOne = [
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
  , 1, 2, 2, 1, 0, 0, 0, 1, 3, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1
  , 1, 1, 1, 1, 0, 0, 0, 1, 3, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1
  , 0, 4, 0, 0, 0, 0, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 0, 4, 0, 0, 0, 0, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
  , 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5
];

var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_TREE = 3;
const TRACK_GOAL = 4;
const TRACK_WALL_FLAG = 5;

drawTracks = () => {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;

    for (var eachRow = 0; eachRow < TRACK_ROW; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

            //var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            var tileKind = trackGrid[arrayIndex];
            var useImg = trackPics[tileKind];

            canvasContext.drawImage(useImg,drawTileX, drawTileY);
            drawTileX += TRACK_W;
            arrayIndex++;
        }
        drawTileY += TRACK_H;
        drawTileX = 0;
    }
}

function returnTileTypeAtColRow(col, row) {

    if (col >= 0 && col < TRACK_COLS &&
        row >= 0 && row < TRACK_ROW) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord]);
    } else {
        return TRACK_WALL;
    }
}

function carTrackHandling(whichCar) {
    var carTrackCol = Math.floor(whichCar.X / TRACK_W);
    var carTrackRow = Math.floor(whichCar.Y / TRACK_H);
    var trackUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow)

    if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
        carTrackRow >= 0 &&
        carTrackRow < TRACK_ROW) {
          var tileHere = returnTileTypeAtColRow(carTrackCol,carTrackRow )

          if(tileHere == TRACK_GOAL){
            console.log(`${whichCar.name} WINS!!!!`);
            loadLevel(levelOne);
          }else if(tileHere != TRACK_ROAD){
            whichCar.X -= Math.cos(whichCar.Ang) * whichCar.Speed;
            whichCar.Y -= Math.sin(whichCar.Ang) * whichCar.Speed;
            whichCar.Speed *= -0.3;
          }//end if tile check
      }//end if
  } //end carTrackHandling

  rowColToArrayIndex = (col, row) => {
      return col + TRACK_COLS * row;

  }

  trackGridReset = () => {

      for (var i = 0; i <= TRACK_COLS * TRACK_ROW; i++) {
          trackGrid[i] = true;
      }
  }
