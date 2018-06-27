/* todos:
- 3 chains (tomcoin, bitcoin, ethereum)
- button to add block
- button to build truss
- variable for Difficulty 
(change onclick now, listen for chain events later)
- add dummy json
- turne everything into scribble

process:
block 1 on chain 1 is a committed transaction. 
block 1 hugs block 2 on chain 2 
block 3 completes (block 3 has reference )
increase forking difficulty by consensus algorithm

backlog:
- tooltip on each block

*/

// class Chain {
//   construcor(block[]) {
//     this.blocks = block[];
//   }
// }

// fake data
var mepos = {
  "x": 100,
  "y": 100
}

var mepos2 = {
  "x": 100,
  "y": 400
}

var ethereumpos = {
  "x": 400,
  "y": 250
}

var me1 = {
  "number": 1,
  "prev_hash": 0x37ef0b9f6f,
  "difficulty": 20,
  "nonce": 100,
  "merkel_root": 0xfc94985832,
  "truss_array": []
}

var me3 = {
  "number": 3,
  "prev_hash": 0x4ce17b43f3,
  "difficulty": 20,
  "nonce": 300,
  "merkel_root": 0xfc94985832,
  "truss_array": []
}

var ethereum = {
  "number": 2,
  "prev_hash": 0xa89d1edda8,
  "difficulty": 200,
  "nonce": 202,
  "merkel_root": 0x57b02774d1,
  "truss_array": []
}

// block class
class Block {
  constructor(pos,type) {
    this.x = pos.x;
    this.y = pos.y;
    this.width = 100;
    this.height = 100;
    this.type = type; // json object
    var r = random(255);
    var g = random(255);
    var b = random(255);
    fill(r,g,b);
    rect(this.x, this.y, this.width, this.height);
  }
}

var drawing;
var bl1;
var bl2;
var bl3;
var finished;

function reset() {

  drawing = new Scribble();
  drawing.bowing = 1;
  drawing.roughness = 1;
  createCanvas(1000,1000);
  // line
  stroke(100);
  strokeWeight(5);
  bl1 = new Block(mepos, me1);
  bl3 = new Block(mepos2, me3);
  bl2 = new Block(ethereumpos, ethereum);
  line(bl1.x+bl1.width/2, 0, bl1.x+bl1.width/2, height);
  line(bl2.x+bl2.width/2, 0, bl2.x+bl2.width/2, height);
}

function setup() {
  reset();
}

function draw() {
  // read json input every loop and update interface
  textSize(32);
  fill(255);
  textFont('Helvetica');
  text('WeakCoin', bl1.x+bl1.width/2, 50);
  text('Ethereum', bl2.x+bl2.width/2, 50);
}

function keyPressed() {
  if (keyCode == ENTER) {
    clear();
    reset();
  }
}

function mousePressed() {

  if (dist(mouseX, mouseY, bl1.x, bl1.y) < 100) {
    line(bl1.x+bl1.width/2, bl1.y+bl1.height/2, bl2.x+bl2.width/2, bl2.y+bl2.height/2);
  }
  if (dist(mouseX, mouseY, bl3.x, bl3.y) < 100) {
    line(bl2.x+bl2.width/2, bl2.y+bl2.height/2, bl3.x+bl3.width/2, bl3.y+bl3.height/2);
  }
}