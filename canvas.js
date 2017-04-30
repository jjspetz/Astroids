
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

}
