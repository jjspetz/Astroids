
window.onload = function() {
  // basic canvas set up
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // set canvas width and height to width and height of screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

 // builds list of astroid sources
  var astroidName = ['images/astroid1.png', 'images/astroid2.png', 'images/astroid3.png', 'images/astroid4.png'];
  astroids = [];
  for (var i = 0; i < 10; i++) {
    var tmpImg = new Image();
    tmpImg.src = astroidName[Math.floor(Math.random() * 3.99)]
    astroids.push(tmpImg);
  }

  // print all astroids
  for (var i = 1; i < 5; i++){
    var img = astroids[i]
    ctx.drawImage(img, 100 * i, 100);
    // img.src = astroidSource[i];
  }

  // test astroid
  // var img = new Image();
  // img.onload = function() {ctx.drawImage(img, 100, 100)};
  // img.src = astroids[0];

  // figure out how to load everything

  var files = [url1, url2, url, ...],
      images = [],
      numOfFiles = files.length,
      count = numOfFiles;

  // function to load all images in one go
    // function loadImages() {
    //
    //     // go through array of file names
    //     for(var i = 0; i < numOfFiles; i++) {
    //
    //         // create an image element
    //         var img = document.createElement('img');
    //
    //         // use common loader as we need to count files
    //         img.onload = imageLoaded;
    //         //img.onerror = ... handle errors too ...
    //         //img.onabort = ... handle errors too ...
    //
    //         img.src = files[i];
    //
    //         // push image onto array in the same order as file names
    //         images.push(img);
    //     }
    // }
    // function imageLoaded(e) {
    //
    //     // for each successful load we count down
    //     count--;
    //     if (count === 0) draw(); //start when all images are loaded
    // }

      // function draw() {
      // for(var i = 0, img; img = images[i++];)
      //     ctx.drawImage(img, x, y); // or get x and y from an array
      // }
}
