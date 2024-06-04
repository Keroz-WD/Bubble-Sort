let list = [];

const newList = (numItems) => {
  for (i = 0; i < numItems; i++) {
    num = Math.ceil(Math.random() * 100);
    list.push(num);
    drawBars(num);
  }
  console.log(list);
};

const drawBars = (barHeight) => {
  let bar = document.createElement("div");
  bar.classList.add("bar");
  bar.style.height = barHeight * 2 + "px";
  graph.appendChild(bar);
};

const sortList = () => {
  let range = list.length - 1;
  for (i = 0; i < list.length; i++) {
    for (j = 0; j < range; j++) {
      if (list[j] > list[j + 1]) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]];
      }
      delay(i, j);
    }
    range--;
  }
  console.log(list);
};

const delay = (i, j) => {
  setTimeout(() => {
    console.log("tic");
  }, 1000);
};

newList(30);
sortList();
