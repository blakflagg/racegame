function drawBitmapWithRotation(useBitmap,atX,atY,withAng){
  canvasContext.save();
  canvasContext.translate(atX,atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap,  -useBitmap.width/2, -useBitmap.height/2);
  canvasContext.restore();
}

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
