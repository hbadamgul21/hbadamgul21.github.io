
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var dx2 = 9;
var x2 = 25;
var y2 = 240;
var W = 80;
var H = 10;


function Rect(x2,y2,w,h) {
  ctx.beginPath();
  ctx.rect(x2,y2,w,h);
  ctx.closePath();
  ctx.fill();
}

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
    
    this.update = function() {
        if(this.x + this.radius > c.width || this.x -  this.radius < 0)
        {
            this.dx = -this.dx;
        }
        if(this.y - this.radius < 0)
        {
            this.dy = -this.dy;
        } else if(this.y + this.radius > c.height) {
            if(this.x > x2 && this.x < x2 + W) {
                this.dy = -this.dy;
            } else {
                //alert("GAME OVER");
                //window.location.refresh();
                ctx.font = "30px Arial";
                ctx.fillText("GAME OVER!", 150, 50);
                ctx.font = "15px Arial";
                ctx.fillStyle = "green"
                ctx.fillText("Refresh Page To Try Again.", 150, 90);


            }
        }
        
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
    }
}

var x = c.width/2;
var y = c.height-90;
var dx = 4.5;
var dy = -4.5;
var radius = 10;

var circle = new Circle(x, y, dx, dy, radius);

function clear() {
    ctx.clearRect(0,0,c.width,c.height)
}


function doKeyDown(evt){
  switch (evt.keyCode) {
    case 37:  /* Left arrow was pressed */
  		if (x2 - dx2 > 0){ 
        x2 -= dx2;
      }
      break;
    case 39:  /* Right arrow was pressed */
  		if (x2 + dx2 < 400){ 
        x2 += dx2;
      }
      break;
  }
}


function StartGame() {
  requestAnimationFrame(StartGame);
  clear();
  Rect(x2,y2,W,H);
  ctx.fillStyle = "red";
  
  circle.update();
  
}

//animate();
window.addEventListener('keydown',doKeyDown,true);
