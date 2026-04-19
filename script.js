let audioCtx;

let interval;

let step = 0;

// STEP DATA

const kick = Array(16).fill(0);

const snare = Array(16).fill(0);

const hat = Array(16).fill(0);

// ---------------- AUDIO ----------------

function playTone(freq, time, duration) {

  const osc = audioCtx.createOscillator();

  const gain = audioCtx.createGain();

  osc.frequency.value = freq;

  osc.type = "sine";

  gain.gain.setValueAtTime(0.2, time);

  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  osc.connect(gain);

  gain.connect(audioCtx.destination);

  osc.start(time);

  osc.stop(time + duration);

}

function noise(time, length, volume) {

  const buffer = audioCtx.createBuffer(1, 44100, 44100);

  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {

    data[i] = Math.random() * 2 - 1;

  }

  const src = audioCtx.createBufferSource();

  src.buffer = buffer;

  const gain = audioCtx.createGain();

  gain.gain.value = volume;

  src.connect(gain);

  gain.connect(audioCtx.destination);

  src.start(time);

  src.stop(time + length);

}

// ---------------- START ----------------

function start() {
  function start() {

  if (interval) clearInterval(interval); // stoppar gamla loops

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  step = 0; // RESET

  createGrid();

  interval = setInterval(() => {

    const now = audioCtx.currentTime;

    if (kick[step]) playTone(60, now, 0.15);

    if (snare[step]) noise(now, 0.2, 0.4);

    if (hat[step]) noise(now, 0.05, 0.1);

    step = (step + 1) % 16;

  }, 130);

}
step = 0;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  createGrid(); // viktigt

  interval = setInterval(() => {

    const now = audioCtx.currentTime;

    if (kick[step]) playTone(60, now, 0.15);

    if (snare[step]) noise(now, 0.2, 0.4);

    if (hat[step]) noise(now, 0.05, 0.1);

    step = (step + 1) % 16;

  }, 130);

}

function stop() {

  clearInterval(interval);

}

// ---------------- GRID ----------------

function createGrid() {

  const grid = document.getElementById("grid");

  grid.innerHTML = "";

  for (let i = 0; i < 16; i++) {

    const col = document.createElement("div");

    const k = document.createElement("button");

    const s = document.createElement("button");

    const h = document.createElement("button");

    k.innerText = kick[i] ? "K1" : "K";

    s.innerText = snare[i] ? "S1" : "S";

    h.innerText = hat[i] ? "H1" : "H";

    k.onclick = () => {

      kick[i] = kick[i] ? 0 : 1;

      createGrid();

    };

    s.onclick = () => {

      snare[i] = snare[i] ? 0 : 1;

      createGrid();

    };

 h.onclick = () => {

  hat[i] = hat[i] ? 0 : 1;

  createGrid();

};

col.appendChild(k);

col.appendChild(s);

col.appendChild(h);

grid.appendChild(col);

  }

}
