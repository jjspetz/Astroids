# Astroids
### 4/29
This is an attempt to port a pygame I worked on yesterday to HTML canvas using javascript. So far I am having trouble loading my
image elements into an array and then loading them on to the page with a for loop. The problem seems to stem from the time
it takes for an image to load using the onload function inside the for loop.
### 5/1
The astroid generation is up and running the next step is to add the key event listeners
### 5/3
The functionality of the original PyGame is complete. Now I will need to work on the additional features I wanted.
### 5/11
window.requestAnimationFrame() has replaced setInterval() and has broken everything. Old working version is saved as v1. Code will have to be completely rewritten to imporve performance.
### 5/24
The new requestAnimationFrame() version is working without any astroids. When adding
astroids back in I anticipate a problem with clearing the screen everything will have to be rendered and cleared in one go as the code is currently written.
