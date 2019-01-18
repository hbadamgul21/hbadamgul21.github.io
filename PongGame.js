
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var dx2 = 10;
var x2 = 25;
var y2 = 345;
var W = 80;
var H = 10;
var x = c.width/2;
var y = c.height-90;
var dx = 4.5;
var dy = -4.5;
var radius = 5;
var eX = 320;
var eY = 5;
var eW = 80;
var eH = 5;

//creating the paddle, call it in StartGame function
function Rect(x2,y2,w,h) {
  ctx.beginPath();
  ctx.rect(x2,y2,w,h);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
}

function EnemyRect(x, y, w, h)
{
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fillStyle = "blue";
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
        if(this.y - this.radius < 10)
        {
            if(this.x > eX && this.x < eX + eW)
            {
                this.dy = -this.dy;   
            } else {
                ctx.font = "30px Arial";
                ctx.fillStyle = "blue"
                ctx.fillText("You Win!", 150, 100);
                ctx.font = "15px Arial";
                ctx.fillStyle = "green"
                ctx.fillText("Refresh Page To Try Again.", 120, 150);
                this.radius = 0;
                this.dx = 0;
                //this.dy = 0;
                
            }
        } else if(this.y + this.radius > c.height) {
            if(this.x > x2 && this.x < x2 + W) {
                this.dy = -this.dy;
            } else {
                ctx.font = "30px Arial";
                ctx.fillStyle = "red"
                ctx.fillText("You Lose!", 150, 100);
                ctx.font = "15px Arial";
                ctx.fillStyle = "green"
                ctx.fillText("Refresh Page To Try Again.", 120, 150);
                this.radius = 0;
                this.dx = 0;
                //this.dy = 0;
              
            }
        }
        //Enemy AI movement 
        if(this.x + this.radius < 145) 
        {
            if (eX - dx2 > 10)
            { 
                eX -= 14;    
            } 
        } else if (this.x + this.radius > 145)
        {
            if (eX + dx2 < 302)
            { 
                eX += 14;
            }
        }
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
    }
    
}

var circle = new Circle(x, y, dx, dy, radius);

//clear the canvas when called
function clear() {
    ctx.clearRect(0,0,c.width,c.height)
}

//keys for left and right arrow functionality
function doKeyDown(evt){
  switch (evt.keyCode) {
    case 37:  /* Left arrow was pressed */
  		if (x2 - dx2 > 0){ 
        x2 -= dx2;
      }
      break;
    case 39:  /* Right arrow was pressed */
  		if (x2 + dx2 < 325){ 
        x2 += dx2;
      }
      break;
  }
}

//Run the game
function StartGame() {
  requestAnimationFrame(StartGame);
  clear();
  Rect(x2,y2,W,H);
  EnemyRect(eX, eY, eW, eH);
  circle.update();
  
}

window.addEventListener('keydown',doKeyDown,true);