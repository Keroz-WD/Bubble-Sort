const numItems = 24; // Numbers in the list
const delay = 90; // Delay in ms between each test
const numberRange = 100;
const heightScale = 2;
let list = [];
let bars;
let isSorting = false;
let isSorted = false;

const newList = async () => {
  isSorting = false;
  isSorted = false;
  for (i = 0; i < numItems; i++) {
    num = Math.ceil(Math.random() * numberRange);
    list[i] = num;
    drawBars(num);
  }
  bars = document.querySelectorAll(".bar");
  console.log("New list:\n" + list);
};

// Draw bars in #graph
const drawBars = async (barHeight) => {
  let newBar = document.createElement("div");
  newBar.classList.add("bar");
  newBar.style.height = barHeight * heightScale + 12 + "px";
  newBar.textContent = barHeight;
  graph.appendChild(newBar);
};

const deleteBars = async () => {
  const allBars = [...document.getElementsByClassName("bar")];
  allBars.forEach((element) => {
    element.remove();
  });
};

const resetGraph = async () => {
  isSorted = false;
  await deleteBars();
  await newList();
  updateButton();
};

const sortList = async () => {
  let range = list.length - 1;
  isSorting = true;
  isSorted = false;
  updateButton();
  for (i = 0; i < list.length; i++) {
    for (j = 0; j < range; j++) {
      bars[j].classList.add("highlight");
      if (list[j] > list[j + 1]) {
        // Swap list values
        [list[j], list[j + 1]] = [list[j + 1], list[j]];
        // Swap bars heights
        bars[j].style.height = list[j] * heightScale + 12 + "px";
        bars[j + 1].style.height = list[j + 1] * heightScale + 12 + "px";
        // Swap bars numbers
        bars[j].textContent = list[j];
        bars[j + 1].textContent = list[j + 1];
      }
      // Slow down the loop
      await sleep(delay);
      bars[j].classList.remove("highlight");
    }
    range--;
  }
  isSorting = false;
  isSorted = true;
  updateButton();
  console.log("Sorted list:\n" + list);
};

const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const updateButton = () => {
  if (isSorting && isSorted === false) {
    button.textContent = "Sorting...";
  } else if (isSorting === false && isSorted) {
    button.textContent = "New list";
  } else button.textContent = "Start sorting";
  button.disabled = isSorting;
};

newList();
graph.style.height = numberRange * heightScale + 10 + "px";

button.addEventListener("click", (e) => {
  if (isSorting === false && isSorted === false) {
    sortList();
  } else {
    resetGraph();
  }
});
