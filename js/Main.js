var canvas;
var canvasContext;

var blueCar = new Car('player1',75,75,0,0);

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
    blueCar.Reset();
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
    blueCar.draw();

}

moveEverything = () => {

    blueCar.Move();
    carTrackHandling(blueCar);

};
