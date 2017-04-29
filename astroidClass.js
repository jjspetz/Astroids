
// builds list of astroid sources
 var astroidName = [
   'images/astroid1.png',
   'images/astroid2.png',
   'images/astroid3.png',
   'images/astroid4.png'];

 // reliable generates a bunch of astroids (faster generation results in some not loading)
 var count = 0;
 var counter = setInterval (function() {
   // creates new image, loads random source, and draws it on the screen
   var img = new Image();
   img.onload = function() {ctx.drawImage(img, x, 100)};
   img.src = astroidName[Math.floor(Math.random() * 3.99)];

   count++;
   if (count > 10) { // breaks loop after 10 astroids are drawn
     clearInterval(counter);
   }
 }, 20); // less than 20 ms results in some astroids not being drawn.
// onload does not delay the loop it is in and take time to load an image.
