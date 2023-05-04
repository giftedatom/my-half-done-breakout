function setup() {
    createCanvas(1900, 1000);
  }
  
  function draw() {
    // Draw the sky
    background(120, 190, 240);
    
    // Draw the sun
    fill(255, 255, 200);
    stroke(255, 255, 150);
    ellipse(500, 100, 100, 100);
    
    // Draw the shore
    fill(170, 130, 70);
    noStroke();
    rect(0, 300, 1900, 800);
    
    // Draw the water
    fill(70, 120, 170);
    noStroke();
    rect(0, 300, 1900, 400);
 
    fill("brown")
    rect(800, 500, 200, 50, 20);  
     
    textSize(20);
    fill(0,0,0);
    text("click to start", 850, 530);
    
    if(mousex >= 300 && mouseX <= 500 && mouseY >= mouseIsPressed == true)
    stage = 1;
      }  
  