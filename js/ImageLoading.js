var carPic = document.createElement("img");
var otherCarPic = document.createElement("img");
var trackPics = [];


var picsToLoad = 0; //set in the loadImages method

function countLoadedImagesAndLoadLaunchIfReady(){
  picsToLoad--;
  if(picsToLoad == 0){
    imageLoadingDoneStartGame();
  }
  console.log(picsToLoad);
}

function beginLoadingImage(imgVar, fileName){

  imgVar.onload = countLoadedImagesAndLoadLaunchIfReady();
  imgVar.src = "Images/" + fileName;
}

function loadImageForTrackCode(trackCode,fileName){

  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode],fileName);
}

function loadImages(){
  var imageList = [
    {varName: carPic, theFile: "player1.png"},
    {varName: otherCarPic, theFile: "player2.png"},
    {trackType: TRACK_ROAD, theFile: "track_road.png"},
    {trackType: TRACK_WALL, theFile: "track_wall.png"},
    {trackType: TRACK_GOAL, theFile: "track_goal.png"},
    {trackType: TRACK_TREE, theFile: "track_tree.png"},
    {trackType: TRACK_WALL_FLAG, theFile: "track_flag.png"}
  ];


  picsToLoad = imageList.length;

  for(var i = 0;i<imageList.length;i++){
    if(imageList[i].varName != undefined){
      beginLoadingImage(imageList[i].varName,imageList[i].theFile);
    }else{
      loadImageForTrackCode(imageList[i].trackType,imageList[i].theFile);
    }
  }

}
