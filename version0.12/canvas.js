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

  // global variables
  var ship;
  var animation;

  // event listeners
  var Key = {
     _pressed: {},

     A: 65,
     W: 87,
     D: 68,
     S: 83,
     SPACE: 32,
     ESC: 27,

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

  window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

  class Ship {
    constructor(filename, x, y) {
      this.src = filename;
      this.speed = 2;
      this.dWidth = 64;
      this.dHeight = 64;
      this.x = x;
      this.y = y;
    }
    update() {
      if (Key.isDown(Key.W) && this.y > 0) {
        this.y -= this.speed;
      };
      if (Key.isDown(Key.A) && this.x > 0) {
        this.x -= this.speed;
      };
      if (Key.isDown(Key.S) && this.y < canvas.height-100) {
        this.y += this.speed;
      };
      if (Key.isDown(Key.D) && this.x < canvas.width-100) {
        this.x += this.speed;
      };

      render(this.src, this.x, this.y);
    }
  }

  // need to render all pics at once?
  function render(src, x, y, dWidth=64, dHeight=64) {
    var img = new Image();
    img.onload = function() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img, x, y, dWidth, dHeight)
    };
    img.src = src;
  }

  function setup() {
    // create a ship instance
    ship = new Ship('../images/spaceship.png', canvas.width/2, canvas.height/2);
    // start music
    // document.getElementById('audio').innerHTML = '<audio autoplay loop><source src="../sounds/scifi_music.mp3" type="audio/mpeg"></audio>'

    window.requestAnimationFrame( mainloop );
  }

  var mainloop = function() {
    ship.update();
    animation = window.requestAnimationFrame( mainloop );
  };

  function collision_check() {
      var shipRadius = this.ship.dWidth/2;
      ship_circle = {'radius': shipRadius, 'x': this.ship.pos[0] + shipRadius, 'y': this.ship.pos[1] + shipRadius};
      for (var i=0; i<this.astroids.length; i++) {
          var radius = this.astroids[i].dWidth/2;
          var astroid_circle = {'radius': radius, 'x': this.astroids[i].pos[0]
          + radius, 'y': this.astroids[i].pos[1] + radius};
          var dx = ship_circle['x'] - astroid_circle['x'];
          var dy = ship_circle['y'] - astroid_circle['y'];
          var dist_apart = Math.sqrt(dx * dx + dy * dy);
          if (dist_apart < astroid_circle['radius']+ship_circle['radius'] - 10) {
              document.getElementById('audio').innerHTML = "<audio autoplay><source src='../sounds/lose.wav' type='audio/wav'></audio>";
              return true;
            }
        }
        return false;
  }

  function menu(count=0, first=true) {
    function clear() {
      window.cancelAnimationFrame(animation);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
    }
    if (first) {
      clear();
      ctx.fillText("Use the W,A,S, and D keys to avoid the astroids", canvas.width/2, canvas.height/2 -80);
      ctx.fillText("Press SPACE to begin.", canvas.width/2, canvas.height/2);
      ctx.font = "18px Arial";
      ctx.fillText("by JJ Spetseris", canvas.width/2, canvas.height/2 + 120);
    }
    else {
        // cancelAnimationFrame(mainloop());
        clear();
        var text = "You survived for "+  count/50 + " seconds.";
        ctx.fillText(text, canvas.width/2, canvas.height/2);
        ctx.fillText("Press SPACE to begin.", canvas.width/2, canvas.height/2 + 100);
    }

    var temp = setInterval (function() {
      if (Key.isDown(Key.SPACE) || Key.isDown(13)) {
        clearInterval(temp);
        setup();

      }
    }, 100);
  }

    // start the mainloop
    menu();
}
