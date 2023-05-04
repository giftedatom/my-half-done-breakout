/// <reference path="lib/p5.global.d.ts" />

class Game {
    width = 1000;
    height = 950;
    lives = 3;
    points = 0;
    targetRows = 5;
    targetCols = 7;
  }
  
  class Ball {
    constructor() {
      this.x = game.width / 2;
      this.y = game.height - 100;
      this.vx = 3;
      this.vy = -3;
      this.size = 20;
    }
    draw() {
      fill( "grey");
      circle(this.x, this.y, this.size);
      this.x += this.vx;
      this.y += this.vy;
  
      this.collideWithWalls();
      this.collideWithPaddle();
      this.collideWithTargets();
    }
    collideWithWalls() {
      if (this.x < 0 || this.x > game.width) {
        this.vx = -this.vx;
      }
      if (this.y < 0) {
        this.vy = -this.vy;
      }
      if (this.y > game.height) {
        this.lives--;
        if (this.lives === 0) {
          // game over
          noLoop();
        } else {
          // reset ball and paddle
          this.x = game.width / 2;
          this.y = game.height - 100;
          this.vx = 3;
          this.vy = -3;
          paddle.reset();
        }
      }
    }
    collideWithPaddle() {
      if (
        this.y + this.size / 2 >= paddle.y &&
        this.x + this.size / 2 >= paddle.x &&
        this.x - this.size / 2 <= paddle.x + paddle.width
      ) {
        this.vy = -this.vy;
      }
    }
    collideWithTargets() {
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        if (
          this.y - this.size / 2 <= target.y + target.height &&
          this.x + this.size / 2 >= target.x &&
          this.x - this.size / 2 <= target.x + target.width
        ) {
          targets.splice(i, 1);
          this.points++;
          this.vy = -this.vy;
        }
      }
    }
  }
  
  class Paddle {
    constructor() {
      this.width = 150;
      this.height = 50;
      this.x = (game.width - this.width) / 2;
      this.y = game.height - 50;
      this.speed = 8;
      this.previousX = 0
    }
    
    draw() {
      if(this.previousX< this.x){
        this.drawRight()
      } else {
        this.drawRight();
      }
    }
    drawRight(){
      // color
      fill(140, 72, 49);
      // rectangle
      rect(this.x, this.y, this.width, this.height);
      //tip of the ship
      triangle(this.x, this.y, this.x + this.width / 2, this.y - this.height / 2, this.x + this.width, this.y);
      // sail color
      fill(255, 255, 255);
      // sail
      triangle(this.x + this.width / 2, this.y - this.height / 2, this.x + this.width / 2, this.y - this.height, this.x + this.width, this.y - this.height / 2);
    }
    
    move() {
      this.previousX = this.x;
      this.x = mouseX - this.width / 2;
      
      this.x = constrain(this.x, 0, game.width - this.width);
    }
  }
  
      
  class Target {
    constructor(row, col) {
      this.row = row;
      this.col = col;
  
      this.height = 15;
      this.width = game.width / game.targetCols;
      this.x = this.width * this.row;
      this.y = (120 / game.targetRows) * col + 20;
    }
    draw() {
      fill("blue");
      strokeWeight(2);
      stroke("white");
      rect(this.x, this.y, this.width, this.height);
    }
  }
  
  let game;
  let ball;
  let paddle;
  let targets = [];
  
  function setup() {
    game = new Game();
    createCanvas(game.width, game.height);
    ball = new Ball();
    paddle = new Paddle();
  
    for (let across = 0; across < game.targetCols; across++) {
        for (let down = 0; down < game.targetRows; down++) {
        targets.push(new Target(across, down));
        }
        }
        };
        
        function mouseMoved() {
        paddle.x = mouseX - paddle.width / 2;
        }
        
        function keyPressed() {
        if (keyCode === 32) {
        // space bar
        if (!ball.inPlay) {
        ball.inPlay = true;
        }
        }
        }
        
        function drawLives() {
          for (let i = 0; i < game.lives; i++) {
          fill("red");
          noStroke();
          circle(game.width - 30 - i * 25, 30, 10);
          }
          }
          
          function drawScore() {
          fill("black");
          textSize(24);
          text(`Score: ${game.points}`, 10, 30);
          }
          
          function loseLife() {
          game.lives--;
          if (game.lives === 0) {
          // game over
          noLoop();
          } else {
          ball = new Ball();
          ball.inPlay = false;
          paddle = new Paddle();
          }
          }
          
          function winGame() {
          // you win!
          noLoop();
          textSize(48);
          fill("black");
          text("You Win!", game.width / 2 - 100, game.height / 2);
          }
          
          function gameOver() {
          // game over
          noLoop();
          textSize(48);
          fill("black");
          text("Game Over", game.width / 2 - 100, game.height / 2);
          }
          
          function checkForWin() {
          if (targets.length === 0) {
          winGame();
          }
          }
          
          function checkForLoss() {
          if (ball.y > game.height) {
          loseLife();
          }
          }
          
          function checkForCollision() {
          if (dist(ball.x, ball.y, paddle.x + paddle.width / 2, paddle.y + paddle.height / 2) < ball.size / 2 + paddle.width / 2) {
          // collision with paddle
          ball.vy = -ball.vy;
          }
          
          for (let i = targets.length - 1; i >= 0; i--) {
          const target = targets[i];
          if (ball.x > target.x && ball.x < target.x + target.width && ball.y > target.y && ball.y < target.y + target.height) {
          // collision with target
          targets.splice(i, 1);
          game.points++;
          ball.vy = -ball.vy;
          break;
          }
          }
          }
          
          function draw() {
          background(200);
          ball.draw();
          paddle.draw();
          for (const target of targets) {
          target.draw();
          }
          
          drawLives();
          drawScore();
          
          checkForWin();
          checkForLoss();
          checkForCollision();
          }
  
          function setup() {
          game = new Game();
          createCanvas(game.width, game.height);
          ball = new Ball();
          paddle = new Paddle();
          
          for (let across = 0; across < game.targetCols; across++) {
          for (let down = 0; down < game.targetRows; down++) {
          targets.push(new Target(across, down));
          }
          }
          }