/*
  This is my project to port the PyGame astroid-dodge to HTML5 Canvas/ javascript.
  The first step overcome so far was learning how to load multiple images onto
  the canvas dynamically. After porting the original game I plan to make improvements.

*/

window.onload = function() {
  // basic canvas set up
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // set canvas width and height to width and height of screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // builds list of astroid sources
 var astroidName = [
   'images/astroid1.png',
   'images/astroid2.png',
   'images/astroid3.png',
   'images/astroid4.png'];

   var Key = {
     _pressed: {},

     A: 65,
     W: 87,
     D: 68,
     S: 83,

     isDown: function(keyCode) {
       return this._pressed[keyCode];
     },

     onKeydown: function(event) {
       this._pressed[event.keyCode] = true;
     },

     onKeyup: function(event) {
       delete this._pressed[event.keyCode];
     }
   };

class Astroid {
  constructor(filename) {
     this.src = filename;
     this.choice = Math.floor(Math.random() * 8);
     this.speed = Math.random() + 0.5;
     this.dWidth = (Math.random() + 0.5) * 100;
     this.dHeight = this.dWidth;

     var spawn = Math.floor(Math.random()*4);
     if (spawn == 0)
       this.pos = [Math.random()*canvas.width, -100];
     else if (spawn == 1)
       this.pos = [Math.random()*canvas.width, canvas.height];
     else if (spawn == 2)
       this.pos = [-100, Math.random()*canvas.height];
     else if (spawn == 3)
       this.pos = [canvas.width, Math.random()*canvas.height]
    }
  }

class Ship {
  constructor(filename, x, y) {
    this.src = filename;
    this.speed = 2;
    this.dWidth = 60;
    this.dHeight = 60;
    this.pos = [x, y]
  }
}
Ship.prototype.update = function() {
  if (Key.isDown(Key.W)) {
    this.pos[1] -= 2 * this.speed;
  };
  if (Key.isDown(Key.A)) {
    this.pos[0] -= 2 * this.speed;
  };
  if (Key.isDown(Key.S)) {
    this.pos[1] += 2 * this.speed;
  };
  if (Key.isDown(Key.D)) {
    this.pos[0] += 2 * this.speed;
  };
  render(this.src, this.pos[0], this.pos[1]);
};

function render(src, x, y, dWidth=60, dHeight=60) {
  var img = new Image();
  img.onload = function() {ctx.drawImage(img, x, y, dWidth, dHeight)};
  img.src = src;
}


function move (x, y, choice, speed) {

  // script for astroid's random vector
  if (choice == 0) {
    x += 2 * speed;
  }
  else if (choice == 1) {
      x += 1 * speed;
      y += 1 * speed;
    }
  else if (choice == 2) {
      x += -1 * speed;
      y += 1 * speed;
    }
  else if (choice == 3) {
      x += -2 * speed;
    }
  else if (choice == 4) {
      y += 2 * speed;
    }
  else if (choice == 5) {
      x += 1 * speed;
      y += -1 * speed;
    }
  else if (choice == 6) {
      x += -1 * speed;
      y += -1 * speed;
    }
  else if (choice == 7) {
      y += -2 * speed;
    }
  // resets astroid when it moves off the edge of the screen
  if (x > canvas.width + 100) {
      x = 0;
    }
  else if (x < -100) {
      x = canvas.width- 20;
    }
  else if (y > canvas.height + 100) {
      y = 0;
    }
  else if (y < -100) {
      y = canvas.height - 20;
    }

  var pos = [x, y];
  return pos;
}

// create x number of astroid
var astroids = [];
for (var i=0; i<12; i++) {
  var astroid = new Astroid(astroidName[Math.floor(Math.random()*4)]);
  astroids.push(astroid);
}
// create the spaceship
this.ship = new Ship('images/spaceship.png', canvas.width/2, canvas.height/2)

// event listener
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

// start game loop
// set up variables
var end = false;
var count = 0;

// build intial astroid array
for (var i=0; i<astroids.length; i++) {
  // setTimeout(render(astroid[i].src, astroid[i].pos[0], astroid[i].pos[1]), 100);
  render(astroids[i].src, astroids[i].pos[0], astroids[i].pos[1], astroids[i].dWidth, astroids[i].dHeight);
}
// an array of the astroid objects positions
this.posArr = [];
for (var i=0; i<astroids.length; i++) {
  var pos = [astroids[i].pos[0], astroids[i].pos[0]];
  this.posArr.push(pos);
}
// renders the starship
render(this.ship.src, this.ship.pos[0], this.ship.pos[1], this.ship.dWidth, this.ship.dHeight);
this.pos = this.ship.pos;

  // infinite loop
  var counter = setInterval (function() {
    ship.update();

    // loops though all the astroids and updates thier positions
    for (var i=0; i<astroids.length; i++) {
      this.posArr[i] = move(this.posArr[i][0], this.posArr[i][1], astroids[i].choice, astroids[i].speed);
      render(astroids[i].src, this.posArr[i][0], this.posArr[i][1], astroids[i].dWidth, astroids[i].dHeight);
      ctx.clearRect(0,0,canvas.width,canvas.height)
    }
    // adds one more astroid every 2 seconds
    if (count % 100 == 0) {
      var astroid = new Astroid(astroidName[Math.floor(Math.random()*4)]);
      astroids.push(astroid);
      this.posArr.push(astroid.pos);
    }
    if (end) { // breaks loop after 10 astroids are drawn
      clearInterval(counter);
    }
    count++;
  }, 20); // 20 = 50fps
} // end of file
