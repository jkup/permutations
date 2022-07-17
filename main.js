const main = document.getElementById("main");
const form = document.getElementById("form");
const random = document.getElementById("random");
const granny = document.getElementById("granny");
const border = document.getElementById("border");
const borderColor = document.getElementById("borderColor");

let colorInputs = [
  document.getElementById("one"),
  document.getElementById("two"),
  document.getElementById("three"),
  document.getElementById("four"),
  document.getElementById("five"),
];

colorInputs.forEach((input) => {
  input.addEventListener("change", generatePermutations);
});

random.addEventListener("change", generatePermutations);
granny.addEventListener("change", generatePermutations);
border.addEventListener("change", generatePermutations);
borderColor.addEventListener("change", generatePermutations);

function generatePermutations() {
  removeAllChildNodes(main);
  let isRandom = random.checked;
  let colors = colorInputs.map((input) => input.value);

  let permutations = permutator(colors);

  // Shuffle the array
  if (isRandom) {
    permutations = shuffle(permutations);
  }

  permutations.forEach((permutation, index) => {
    granny.checked
      ? generateGrannySquare(permutation, main)
      : generateTiles(permutation, index);
  });
}

function generateTiles(colors, index) {
  let tile = document.createElement("div");
  let totalPosition = 100 * Number(index);
  let topPosition = Math.floor(totalPosition / 1000) * 100;
  let leftPosition = totalPosition % 1000;

  tile.style.position = "relative";
  tile.style.left = leftPosition;
  tile.style.top = topPosition;

  colors.forEach((color, index) => {
    let ring = document.createElement("div");
    let offset = 20;
    let size = 100 - offset * Number(index);
    if (border.checked && index === 0) {
      ring.style.border = `5px solid ${borderColor.value}`;
    } else if (border.checked) {
      ring.style.left = (offset / 2) * Number(index) + 3;
      ring.style.top = (offset / 2) * Number(index) + 3;
    } else {
      ring.style.left = (offset / 2) * Number(index);
      ring.style.top = (offset / 2) * Number(index);
    }

    ring.style.position = "absolute";

    ring.style.width = size;
    ring.style.height = size;
    ring.style.backgroundColor = color;
    tile.appendChild(ring);
  });

  main.appendChild(tile);
}

function generateGrannySquare(colors, node) {
  const canvas = document.createElement("canvas");
  canvas.width = 190;
  canvas.height = 190;
  node.appendChild(canvas);
  const squareSize = 30;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 190, 190);

  // Outer color
  ctx.fillStyle = colors[0];

  // Outer top
  ctx.fillRect(20, 0, squareSize, squareSize);
  ctx.fillRect(60, 0, squareSize, squareSize);
  ctx.fillRect(100, 0, squareSize, squareSize);
  ctx.fillRect(140, 0, squareSize, squareSize);

  // Outer left
  ctx.fillRect(0, 20, squareSize, squareSize);
  ctx.fillRect(0, 60, squareSize, squareSize);
  ctx.fillRect(0, 100, squareSize, squareSize);
  ctx.fillRect(0, 140, squareSize, squareSize);

  // Outer right
  ctx.fillRect(160, 20, squareSize, squareSize);
  ctx.fillRect(160, 60, squareSize, squareSize);
  ctx.fillRect(160, 100, squareSize, squareSize);
  ctx.fillRect(160, 140, squareSize, squareSize);

  // Outer bottom
  ctx.fillRect(20, 160, squareSize, squareSize);
  ctx.fillRect(60, 160, squareSize, squareSize);
  ctx.fillRect(100, 160, squareSize, squareSize);
  ctx.fillRect(140, 160, squareSize, squareSize);

  // Second color
  ctx.fillStyle = colors[1];

  // Second top
  ctx.fillRect(40, 20, squareSize, squareSize);
  ctx.fillRect(80, 20, squareSize, squareSize);
  ctx.fillRect(120, 20, squareSize, squareSize);

  // Second left
  ctx.fillRect(20, 40, squareSize, squareSize);
  ctx.fillRect(20, 80, squareSize, squareSize);
  ctx.fillRect(20, 120, squareSize, squareSize);

  // Second right
  ctx.fillRect(140, 40, squareSize, squareSize);
  ctx.fillRect(140, 80, squareSize, squareSize);
  ctx.fillRect(140, 120, squareSize, squareSize);

  // Second bottom
  ctx.fillRect(40, 140, squareSize, squareSize);
  ctx.fillRect(80, 140, squareSize, squareSize);
  ctx.fillRect(120, 140, squareSize, squareSize);

  // Third color
  ctx.fillStyle = colors[2];

  // Third top
  ctx.fillRect(60, 40, squareSize, squareSize);
  ctx.fillRect(100, 40, squareSize, squareSize);

  // Third left
  ctx.fillRect(40, 60, squareSize, squareSize);
  ctx.fillRect(40, 100, squareSize, squareSize);

  // Third right
  ctx.fillRect(120, 60, squareSize, squareSize);
  ctx.fillRect(120, 100, squareSize, squareSize);

  // Third bottom
  ctx.fillRect(60, 120, squareSize, squareSize);
  ctx.fillRect(100, 120, squareSize, squareSize);

  // Fourth color
  ctx.fillStyle = colors[3];

  // Fourth top
  ctx.fillRect(80, 60, squareSize, squareSize);

  // Fourth left
  ctx.fillRect(60, 80, squareSize, squareSize);

  // Fourth right
  ctx.fillRect(100, 80, squareSize, squareSize);

  // Fourth bottom
  ctx.fillRect(80, 100, squareSize, squareSize);
}

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

window.onload = (event) => {
  generatePermutations();
};
