
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVER_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.07;
const MIN_SPEED_TO_TURN = 0.5;

class Car{
  constructor(name,x,y,speed,ang){
    this.name = name;
    this.X = x;
    this.Y = y;
    this.Speed = speed;
    this.Ang = ang
  }

  set X(val){
    this._X = val;
  }
  get X(){
    return this._X;
  }
  set Y(val){
    this._Y = val;
  }
  get Y(){
    return this._Y;
  }
  set Speed(val){
    this._Speed = val;
  }

  get Speed(){
    return this._Speed;
  }

  set Ang(val){
    this._Ang = val;

  }
  get Ang(){
    return this._Ang;
  }

  Reset() {
    for (var eachRow = 0; eachRow < TRACK_ROW; eachRow++) {
      for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

          var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

          if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
            trackGrid[arrayIndex] = 0;
            this.Ang = -Math.PI/2;
            this.X = eachCol * TRACK_W + TRACK_W/2;
            this.Y = eachRow * TRACK_H + TRACK_H/2;
          }
        }
      }
  }//end of carReset function

  Move() {
     this.Speed *= GROUNDSPEED_DECAY_MULT;
    if(keyHeld_Gas){
      this.Speed += DRIVER_POWER;

    }
    if(keyHeld_Reverse){
      this.Speed -= REVERSE_POWER;
    }
    if(keyHeld_TurnLeft){
      if(Math.abs(this.Speed) > MIN_SPEED_TO_TURN){
        this.Ang -= TURN_RATE;
      }
    }
    if(keyHeld_TurnRight){
      if(Math.abs(this.Speed) > MIN_SPEED_TO_TURN){
        this.Ang += TURN_RATE;
      }
    }

    this.X += Math.cos(this.Ang) * this.Speed;
    this.Y += Math.sin(this.Ang) * this.Speed;
  }// end of move function

  draw(){

      drawBitmapWithRotation(carPic,this.X,this.Y,this.Ang);

  }//end of draw

}// end of class
