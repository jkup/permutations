let form = document.getElementById("form");
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let colors = [
    document.getElementById("one").value,
    document.getElementById("two").value,
    document.getElementById("three").value,
    document.getElementById("four").value,
    document.getElementById("five").value,
  ];

  let permutations = permutator(colors);

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
      let size = 100 - 20 * Number(index);

      ring.style.position = "absolute";
      ring.style.right;
      ring.style.width = size;
      ring.style.height = size;
      ring.style.left = 10 * Number(index);
      ring.style.top = 10 * Number(index);
      ring.style.backgroundColor = item;
      tile.appendChild(ring);
    });

    document.body.appendChild(tile);
  });
});

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
