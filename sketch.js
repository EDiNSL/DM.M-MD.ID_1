
var notes = [];
var circles = [];
var spacing = 50;
var circleSize = 30;
var canvasWidth = 400;
var canvasHeight = 400;

var repulseRadius = 70;

var circleAmtWidth;
var circleAmtHeight;

var mouseIsMoved;

let affectedCirclesX = [];
let affectedCirclesY = [];
let affectedCirclesWeight = [];

var allNotes = ["A", "B", "C", "D", "E", "F", "G"];
var allScale = ["2", "3", "4"];

function setup() {
  background(220);
    createCanvas(canvasWidth, canvasHeight);
    circleAmtWidth = floor(canvasWidth/spacing);
    circleAmtHeight = floor(canvasHeight/spacing);

    for (var i = 0; i<circleAmtWidth; i++){
        var tmpNote = [];
        var tmpCircle = [];
        for (var j = 0; j<circleAmtHeight; j++){
          note = random(allNotes)+random(allScale);
          console.log(note);
          tmpNote.push(note);
        } 
        notes.push(tmpNote);
    }

    frameRate(60);

    
  }


  
  function draw() {

    background(200);
    
    noStroke();
    

    if(frameCount%60==0){
      affectedCirclesX = [];
      affectedCirclesY = [];
      affectedCirclesWeight = [];
    }
    
    for (var i = 0; i<circleAmtHeight; i++){
      for (var j = 0; j<circleAmtWidth; j++){
        var posx = j*spacing+spacing/2;
        var posy = i*spacing+spacing/2;

        if (dist(posx, posy, mouseX, mouseY)<repulseRadius && dist(posx, posy, mouseX, mouseY)>0){
          distance = dist(posx, posy, mouseX, mouseY);

          ratio = distance/repulseRadius;

          posx += circleSize/2*(1-ratio)*((posx-mouseX)/(repulseRadius*ratio));
          posy += circleSize/2*(1-ratio)*((posy-mouseY)/(repulseRadius*ratio));
          
          
          if(frameCount%60==0){
            affectedCirclesX.push(posx);
            affectedCirclesY.push(posy);
            affectedCirclesWeight.push(ratio);
            
            monoSynth = new p5.MonoSynth();
            monoSynth.play(notes[i][j], 1-ratio, 0, 0.9);
          
          }

          
        }
        fill(0);
        ellipse(posx, posy, circleSize, circleSize);
      }

      
    }
    

    if(affectedCirclesX!=null){
      for (var i = 0; i<affectedCirclesX.length; i++){
          fill(255, 0, 0, 255*(1-(frameCount%60)/60)*(1-affectedCirclesWeight[i]));
          ellipse(affectedCirclesX[i], affectedCirclesY[i], circleSize, circleSize);
        
      }
    }

    
  }
