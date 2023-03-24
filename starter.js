const cardsArray = [
  {
    name: "fire",
    img: "img/fire.png",
  },
  {
    name: "youtube",
    img: "img/youtube.png",
  },
  {
    name: "flash",
    img: "img/flash.png",
  },
  {
    name: "gift",
    img: "img/gift.png",
  },
  {
    name: "tron",
    img: "img/tron.png",
  },
  {
    name: "ufo",
    img: "img/ufo.png",
  },
  {
    name: "plant",
    img: "img/plant.png",
  },
  {
    name: "burger",
    img: "img/burger.png",
  },
];
let previousCard;
const deplay = 1000;
let count = 0;
let firstGuess = "";
let secondGuess = "";
const grid = document.querySelector(".grid");

function generateCard() {
  // reset innerHTMl
   grid.innerHTML = "";
  // .sort(() => 0.5 - Math.random()) : random item in array
  const cardsArrayMerge = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
  cardsArrayMerge.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = item.name;
    // front card
    const front = document.createElement("div");
    front.classList.add("front");
    // back card
    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `url(${item.img})`;
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });
}
generateCard();

function handleMatchHere() {
  const selects = document.querySelectorAll(".selected");
  [...selects].forEach((item) => item.classList.add("matched"));
};

function resetGuess() {
  count = 0;
  firstGuess = "";
  secondGuess = ""; 
  previousCard = null;
  const selects = document.querySelectorAll(".selected");
  const matchedAll =  document.querySelectorAll(".matched");
  const cardAll = document.querySelectorAll(".card");
  [...selects].forEach((item) => item.classList.remove("selected"));
  if (matchedAll.length === cardAll.length) {
    matchedAll.forEach((el) => el.classList.remove("matched"));
    generateCard();
  };
};

grid.addEventListener("click", function (e) {
  const clicked  = e.target;
  if (clicked.nodename === "SECTION" || previousCard === clicked || clicked.parentNode.classList.contains("seleted") || clicked.parentNode.classList.contains("matched")) {
    
    return;
  };
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else if (count === 2) {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    };
  };
  if (firstGuess && secondGuess) {
    if (secondGuess === firstGuess) {
      setTimeout(handleMatchHere, deplay);
    };
    setTimeout(resetGuess, deplay);
  };
  previousCard = clicked;
});