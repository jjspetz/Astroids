
class Sprite {
    constructor(filename, x, y) {
        this.pos = [x, y];
        this.src = filename;
        this.switch = Math.floor(Math.random() * 8);
        this.speed = 1;
    }
    function loadAndDraw() {
      var img = this
      ctx.drawImage(img, this.pos[0], this.pos[1])};
      img.src = this.src;
    }

    function move(width, height) {
      x = this.pos[0]
      y = this.pos[1]

      // script for astroid's random vector
      if (this.switch == 0) {
        x += 4 * this.speed;
      }
      else if (this.switch == 1) {
          x += 3 * this.speed;
          y += 3 * this.speed;
        }
      else if (this.switch == 2) {
          x += -3 * this.speed;
          y += 3 * this.speed;
        }
      else if (this.switch == 3) {
          x += -4 * this.speed;
        }
      else if (this.switch == 4) {
          y += 4 * this.speed;
        }
      else if (this.switch == 5) {
          x += 3 * this.speed;
          y += -3 * this.speed;
        }
      else if (this.switch == 6) {
          x += -3 * this.speed;
          y += -3 * this.speed;
        }
      else if (this.switch == 7) {
          y += -4 * this.speed;
        }
      // resets astroid when it moves off the edge of the screen
      if (this.pos[0] > width + 100)
          x = 0;
      else if (this.pos[0] < -100)
          x = width- 20;
      else if (this.pos[1] > height + 100)
          y = 0;
      else if t(his.pos[1] < -100)
          y = height - 20;

      this.pos = [x, y]
    }
  }

class Ship extends Sprite {
    constructor(width, height) {
      this.src = 'images/spaceship_sm.png'
      this.pos = [width/2, height/2]
    }

// start here
//     def move(this, count, screen, width, height):
//         x = this.pos[0]
//         y = this.pos[1]
//
//         # script for astroid's random vector
//         if this.switch == 0:
//             x += 4 * this.speed
//         else if this.switch == 1:
//             x += 3 * this.speed
//             y += 3 * this.speed
//         else if this.switch == 2:
//             x += -3 * this.speed
//             y += 3 * this.speed
//         else if this.switch == 3:
//             x += -4 * this.speed
//         else if this.switch == 4:
//             y += 4 * this.speed
//         else if this.switch == 5:
//             x += 3 * this.speed
//             y += -3 * this.speed
//         else if this.switch == 6:
//             x += -3 * this.speed
//             y += -3 * this.speed
//         else if this.switch == 7:
//             y += -4 * this.speed
//
//         # resets monster when it moves off the edge of the screen
//         if this.pos[0] > width + 100:
//             x = 0
//         else if this.pos[0] < -100:
//             x = width- 20
//         else if this.pos[1] > height + 100:
//             y = 0
//         else if this.pos[1] < -100:
//             y = height - 20
//
//         this.pos = [x, y]
//         this.render(screen)
//
// class Astroid(Sprite):
//     def __init__(this, WIDTH, HEIGHT):
//         this.img = pygame.image.load(random.choice(['images/astroid1.png',
//          'images/astroid2.png', 'images/astroid3.png', 'images/astroid4.png']))
//         this.pos = random.choice(
//             [[-100, random.randint(0,HEIGHT)],
//             [WIDTH, random.randint(0,HEIGHT)],
//             [random.randint(0, WIDTH), -100],
//             [random.randint(0, WIDTH), HEIGHT]]
//             )
//         this.colorkey = [0, 0, 0]
//         this.alpha = 255
//         this.speed = random.randint(1, 10) / 10
//         this.switch = random.randint(0,7)
//         this.rotation = random.randint(-3, 3)
//         this.scale = random.randint(50, 125)/100
//         this.img = pygame.transform.rotozoom(this.img, this.rotation, this.scale)
//         this.dist_to_middle = 50 * this.scale  # used to calculate hit box from center of img
//
//     def rotate(this):
//         this.img = pygame.transform.rotozoom(this.img, 0, random.random())
//
//
//
// #    def rotate(this):
//     #    this.img = pygame.transform.rotozoom(this.img, 0, this.rotation)
//
//     def move(this, x, y, screen):
//         this.pos = [x, y]
//         this.render(screen)
