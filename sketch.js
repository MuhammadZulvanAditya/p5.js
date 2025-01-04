/*

  Pemrograman #10 - Grafkom
  1462200168 - Muhammad Zulvan Aditya

*/

//variabel game
let dino, teksUtama, teksLain, gameKalah;

let skor = 0;

let terakhirMuncul = 0;

let jedaMuncul = 2000;

let rintangan = [];

let layar = null;

function setup() {
  createCanvas(500, 400);
  
  dino = new DinoKotak();

  //teks yang ditampilkan di bagian bawah kanvas
  teksUtama = createP("Klik Untuk Memulai Permainan");
  teksUtama.style("font-size", "20px");
  teksUtama.style("color", "#000000");
  teksLain = createP("Klik Untuk Bermain Lagi (atau Tekan tombol spasi)");
  teksLain.style("font-size", "20px");
  teksLain.style("color", "#000000");
}

function draw() {
  //tampilkan rintangan permainan
  if (millis() >= terakhirMuncul + jedaMuncul) {
    rintangan.push(new Rintangan());
    jedaMuncul = random([0.6, 0.7, 0.8, 0.9, 1]) * 1000;
    terakhirMuncul = millis();
    skor++;
  }
  background(0);

  for (let r of rintangan) {
    r.tampilkan();
    r.gerak();

    //apa yang terjadi ketika dino bertabrakan dengan rintangan
    if (dino.bertabrakan(r)) {
      noLoop();
      gameKalah = true;
      layar = 2;
    }
  }
  dino.tampilkan();
  dino.gerak();

  if (keyIsDown(UP_ARROW)) {
    dino.lompat();
  }
  hitungSkor();
}

function keyPressed() {
  if (key === " ") {
    dino.lompat();

    //restart permainan ketika tombol spasi ditekan
    if (gameKalah === true) {
      mulaiUlangGame();
    }
  }
}

//mulai ulang permainan ketika kanvas diklik
function mousePressed() {
  if (layar === 2) {
    mulaiUlangGame();
  }
}

const hitungSkor = () => {
  fill(255);
  noStroke();
  textSize(20);
  text("Skor: " + skor, 5, 20);
};

//fungsi yang memulai ulang permainan
const mulaiUlangGame = () => {
  skor = 0;
  rintangan = [];
  gameKalah = false;
  dino = new DinoKotak();
  terakhirMuncul = 0;
  jedaMuncul = 500;
  new Rintangan();
  loop();
};

//kelas untuk membuat dino untuk permainan
class DinoKotak {
  constructor() {
    this.x = 20;
    this.ukuranKotak = 40;
    this.y = height - this.ukuranKotak;
    this.kecepatanY = 0;
    this.gravitasi = 0.65;
    this.batasY = 0;
  }

  lompat() {
    if (this.y === height - this.ukuranKotak) {
      this.kecepatanY = -12;
    }
  }

  gerak() {
    this.y += this.kecepatanY;
    this.kecepatanY += this.gravitasi;
    this.y = constrain(this.y, this.batasY, height - this.ukuranKotak);
  }

  tampilkan() {
    rect(this.x, this.y, this.ukuranKotak, this.ukuranKotak);
  }
  //deteksi tabrakan antara dino dan rintangan
  bertabrakan(rintangan) {
    let tabrakan = collideRectRect(
      this.x,
      this.y,
      this.ukuranKotak,
      this.ukuranKotak,
      rintangan.x,
      rintangan.y,
      rintangan.ukuranRintangan,
      rintangan.ukuranRintangan
    );
    return tabrakan;
  }
}

//kelas untuk membuat rintangan permainan
class Rintangan {
  constructor() {
    this.ukuranRintangan = 30;
    this.x = width;
    this.posRintangan = 40;
    this.y = height - this.posRintangan;
  }
  tampilkan() {
    rect(this.x, this.y, this.ukuranRintangan, this.ukuranRintangan);
  }
  gerak() {
    this.x -= 11;
  }
}
  