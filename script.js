let swing = 0.62; // 0.5 = rak, 0.6–0.7 = hiphop feel

let step = 0;

let audioCtx;

let interval;

const scale = [261.63, 293.66, 329.63, 392.00, 440.00];

const kick =  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0];

const snare = [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0];

const hat =   [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1];

let step = 0;

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
const kick =  Array(16).fill(0);

const snare = Array(16).fill(0);

const hat =   Array(16).fill(0);

function start() {

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  interval = setInterval(() => {

    const now = audioCtx.currentTime;

    if (kick[step]) playTone(60, now, 0.15);

    if (snare[step]) noise(now, 0.2, 0.4);

    if (hat[step]) noise(now, 0.05, 0.15);

    if (Math.random() > 0.5) {

      const note = scale[Math.floor(Math.random() * scale.length)];

      playTone(note, now, 0.1);

    }
    

    step = (step + 1) % 16;

  }, 140);

}

function stop() {

  clearInterval(interval);

}
interval = setInterval(() => {

  const now = audioCtx.currentTime;

  const isOffBeat = step % 2 === 1;

  const delay = isOffBeat ? swing * 0.05 : 0;

  const t = now + delay;

  if (kick[step]) playTone(60, t, 0.15);

  if (snare[step]) noise(t, 0.2, 0.4);

  if (hat[step]) noise(t, 0.05, 0.12);

  // mer musikalisk melody (mindre random)

  if (Math.random() > 0.6) {

    const note = scale[Math.floor(Math.random() * scale.length)];

    playTone(note, t, 0.12);

  }

  step = (step + 1) % 16;

}, 130);
