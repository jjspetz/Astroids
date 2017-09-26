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
  var astroids = [];
  var count = 0;

  // builds list of astroid sources
  var astroidName = [
    '../images/astroid1.png',
    '../images/astroid2.png',
    '../images/astroid3.png',
    '../images/astroid4.png'
  ];

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

  // clases
  class Ship {
    constructor(filename, x, y) {
      this.src = filename;
      this.speed = 3;
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
    }
  }

  class Astroid {
    constructor(filename) {
       this.src = filename;
       this.choice = Math.floor(Math.random() * 8);
       this.speed = Math.random() + 0.5;
       this.dWidth = (Math.random() + 0.5) * 80; // icon is 40 - 120 px wide, high
       this.dHeight = this.dWidth;

       var spawn = Math.floor(Math.random()*4);
       if (spawn == 0)
         {this.pos = [Math.random()*canvas.width, -100];}
       else if (spawn == 1)
         {this.pos = [Math.random()*canvas.width, canvas.height];}
       else if (spawn == 2)
         {this.pos = [-100, Math.random()*canvas.height];}
       else
         {this.pos = [canvas.width, Math.random()*canvas.height];}
      }

      move (posx, posy, choice, speed) {
        var x = posx;
        var y = posy;
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

        this.pos = [x, y];
        this.x = x;
        this.y = y;
        render(this);
      }
    }

  // need to render all pics at once
  function render(obj) {
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, obj.x, obj.y, obj.dWidth, obj.dHeight)
    };
    img.src = obj.src;
  }

  // game code
  function setup() {
    // reintialize globals
    astroids = [];
    count = 0;
    // create a ship instance
    ship = new Ship('../images/spaceship.png', canvas.width/2, canvas.height/2);
    // start music
    // document.getElementById('audio').innerHTML = '<audio autoplay loop><source src="../sounds/scifi_music.mp3" type="audio/mpeg"></audio>'
    // create initial astroids
    for (var i=0; i<10; i++) {
      var astroid = new Astroid(astroidName[Math.floor(Math.random()*4)]);
      astroids.push(astroid);
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);
    mainloop();
  }

  var mainloop = function() {
    ship.update();
    render(ship)
    for (var i=0; i<astroids.length; i++) {
      astroids[i].move(astroids[i].pos[0], astroids[i].pos[1], astroids[i].choice, astroids[i].speed);
    }
    // console.log(astroids[0].pos);
    // astroids.push(new Astroid(astroidName[Math.floor(Math.random()*4)]));
    // console.log(astroids.length);

    // breaks if collision
    if (!collisionCheck()) {
      animation = window.requestAnimationFrame( mainloop );
    } else {
      menu(count, false);
    }
    count++;
  };

  function collisionCheck() {
      var shipRadius = ship.dWidth/2;
      var shipCircle = {'radius': shipRadius, 'x': ship.x + shipRadius, 'y': ship.y + shipRadius};
      for (var i=0; i<astroids.length; i++) {
          var radius = astroids[i].dWidth/2;
          var astroidCircle = {'radius': radius, 'x': astroids[i].pos[0]
          + radius, 'y': astroids[i].pos[1] + radius};
          var dx = shipCircle['x'] - astroidCircle['x'];
          var dy = shipCircle['y'] - astroidCircle['y'];
          var distApart = Math.sqrt(dx * dx + dy * dy);
          if (distApart < astroidCircle['radius'] + shipCircle['radius'] - 10) {
              document.getElementById('audio').innerHTML = "<audio autoplay><source src='../sounds/lose.wav' type='audio/wav'></audio>";
              return true;
            }
        }
        return false;
  }

  function menu(count=0, first=true) {
    function clear() {
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
        setTimeout(function(){
          clear();
          var text = "You survived for "+  (count/60).toFixed(2) + " seconds.";
          ctx.fillText(text, canvas.width/2, canvas.height/2);
          ctx.fillText("Press SPACE to begin.", canvas.width/2, canvas.height/2 + 100);
        }, 0);
    }

    var temp = setInterval (function() {
      if (Key.isDown(Key.SPACE) || Key.isDown(13)) {
        clearInterval(temp);
        setup();

      }
    }, 100);
  }

    // start the game
    menu();
}
