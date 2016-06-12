var canvas;
var canvasContext;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d')

    clearScreen();
    colorText("Loading...", canvas.width/2, canvas.height/2);
    loadImages();
}

function imageLoadingDoneStartGame(){
    var framesPerSecond = 60;
    setInterval(updateAll, 1000 / framesPerSecond)
    setupInput();
    carReset();
}

function updateAll() {
    drawEverything();
    moveEverything();

}

function clearScreen(){
  colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawEverything() {
    //clearScreen();
    drawTracks();
    drawCar();

}

moveEverything = () => {

    carMove();
    carTrackHandling();

};
