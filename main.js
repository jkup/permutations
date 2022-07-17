const main = document.getElementById("main");
const form = document.getElementById("form");
const random = document.getElementById("random");
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
    let tile = document.createElement("div");
    let totalPosition = 100 * Number(index);
    let topPosition = Math.floor(totalPosition / 1000) * 100;
    let leftPosition = totalPosition % 1000;

    tile.style.position = "relative";
    tile.style.left = leftPosition;
    tile.style.top = topPosition;

    permutation.forEach((item, index) => {
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
      ring.style.backgroundColor = item;
      tile.appendChild(ring);
    });

    main.appendChild(tile);
  });
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
