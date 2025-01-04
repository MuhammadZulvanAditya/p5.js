/*
    Evaluasi Pemrograman #8 - Grafkom
    1462200168 - Muhammad Zulvan Aditya
*/


let bentukBentuk = [];
let jumlahBentuk = 10;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES); // Mengatur mode sudut ke derajat
}

function draw() {
  background(230);
  
  for (let i = 0; i < bentukBentuk.length; i++) {
    let bentuk = bentukBentuk[i];
    
    push();
    translate(bentuk.x, bentuk.y);
    rotate(bentuk.sudut);
    fill(bentuk.warna);
    rectMode(CENTER);
    rect(0, 0, bentuk.ukuran, bentuk.ukuran);
    pop();
    
    bentuk.x = bentuk.x + bentuk.vx;
    bentuk.y = bentuk.y + bentuk.vy;
    bentuk.sudut += bentuk.kecepatanRotasi;
    
    if (bentuk.x + bentuk.ukuran / 2 > width || bentuk.x - bentuk.ukuran / 2 < 0) {
      bentuk.vx = bentuk.vx * -1;
    }
    if (bentuk.y + bentuk.ukuran / 2 > height || bentuk.y - bentuk.ukuran / 2 < 0) {
      bentuk.vy = bentuk.vy * -1;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < jumlahBentuk; i++) {
    let bentuk = {
      x: mouseX,
      y: mouseY,
      ukuran: 30,
      vx: random([-1, 1]) * random(2, 5),
      vy: random([-1, 1]) * random(2, 5),
      warna: color(random(255), random(255), random(255)),
      sudut: random(360),
      kecepatanRotasi: random(1, 5)
    };
    bentukBentuk.push(bentuk);
  }
}
