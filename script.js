let audioCtx;

let interval;

let step = 0;

let swing = 0.62;

// 16-step patterns

const kick =  Array(16).fill(0);

const snare = Array(16).fill(0);

const hat =   Array(16).fill(0);

// -------------------------

// AUDIO ENGINE

// -------------------------

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

// -------------------------

// STEP SEQUENCER

// -------------------------

function start() {

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  createGrid(); // 👈 bygger UI när du startar

  interval = setInterval(() => {

    const now = audioCtx.currentTime;

    const isOffBeat = step % 2 === 1;

    const delay = isOffBeat ? swing * 0.05 : 0;

    const t = now + delay;

    // drums

    if (kick[step]) playTone(60, t, 0.15);

    if (snare[step]) noise(t, 0.2, 0.4);

    if (hat[step]) noise(t, 0.05, 0.12);

    step = (step + 1) % 16;

  }, 130);

}

function stop() {

  clearInterval(interval);

}

// -------------------------

// STEP GRID UI

// -------------------------

function createGrid() {

  const grid = document.getElementById("grid");

  if (!grid) {

    console.log("GRID FINNS INTE I HTML");

    return;

  }

  grid.innerHTML = "";

  for (let i = 0; i < 16; i++) {

    const col = document.createElement("div");

    col.style.display = "inline-block";

    col.style.margin = "4px";

    const k = document.createElement("button");

    const s = document.createElement("button");

    const h = document.createElement("button");

    k.innerText = "K";

    s.innerText = "S";

    h.innerText = "H";

    k.onclick = () => {

      kick[i] = kick[i] ? 0 : 1;

      console.log("kick", i, kick[i]);

    };

    s.onclick = () => {

      snare[i] = snare[i] ? 0 : 1;

      console.log("snare", i, snare[i]);

    };

    h.onclick = () => {

      hat[i] = hat[i] ? 0 : 1;

      console.log("hat", i, hat[i]);

    };

    col.appendChild(k);

    col.appendChild(s);

    col.appendChild(h);

    grid.appendChild(col);

  }

  console.log("GRID SKAPAD");

}
