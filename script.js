function createGrid() {

  const grid = document.getElementById("grid");

  if (!grid) {

    console.log("GRID FINNS INTE I HTML");

    return;

  }

  grid.innerHTML = ""; // viktigt

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
