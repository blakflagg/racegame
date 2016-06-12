var canvas;
var canvasContext;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d')
    var framesPerSecond = 60;


    setInterval(updateAll, 1000 / framesPerSecond)
    setupInput();

    loadTrackImages();
    carImageLoad();

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
