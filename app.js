//The app for the simone game
//@author Jaykob Walson
var gameOn = false; //this is to tell whether the game is playing or not. Will be set to true once the user presses start.
var rounds;
let start = document.getElementById("play");
var location = 0;

var red = document.getElementById("redSq");
var blue = document.getElementById("blueSq");
var green = document.getElementById("greenSq");
var yellow = document.getElementById("yellowSq");

var sequence = [];
var redBlink = new Audio("sounds/red.wav");
var blueBlink = new Audio("sounds/blue.wav");
var greenBlink = new Audio("sounds/green.wav");
var yellowBlink = new Audio("sounds/yellow.wav");
var nextRound = new Audio("sounds/nextRound.wav");
var currentStatus = document.getElementById("status");

var counter = 1;

var array = [red, blue, green, yellow];
startHover();
colorClicked();

start.addEventListener("click", async function () {
  rounds = document.querySelector("#rounds").value;
  await gameStart();
  gameOn = true;
});
//makes the start animation of the game
async function gameStart() {
  let blink = Math.floor(16); //I've chosen for it to flash 16 times before the game.
  for (let i = 0; i < blink; i++) {
    let randomPick = Math.floor(Math.random() * array.length);
    if (randomPick == 0) {
      let redColor = (red.style.backgroundColor = "red");
      await flash(redColor);
    } else if (randomPick == 1) {
      let blueColor = (blue.style.backgroundColor = "blue");
      await flash(blueColor);
    } else if (randomPick == 2) {
      let greenColor = (green.style.backgroundColor = "green");
      await flash(greenColor);
    } else if (randomPick == 3) {
      let yellowColor = (yellow.style.backgroundColor = "yellow");
      await flash(yellowColor);
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 100)
      );
    }
  }
  addColors();
}

async function flash(colorType) {
  await new Promise((resolve) =>
    setTimeout(() => {
      if (colorType == red.style.backgroundColor) {
        redBlink.play();
        red.style.backgroundColor = "hotpink";
        revert();
      } else if (colorType == blue.style.backgroundColor) {
        blueBlink.play();
        blue.style.backgroundColor = "lightblue";
        revert();
      } else if (colorType == green.style.backgroundColor) {
        greenBlink.play();
        green.style.backgroundColor = "lightgreen";
        revert();
      } else if (colorType == yellow.style.backgroundColor) {
        yellowBlink.play();
        yellow.style.backgroundColor = "lightyellow";
        revert();
      }
      resolve(); // do nothing after waiting 400 ms, just alert the calling thread
    }, 100)
  );
}

async function revert() {
  await new Promise((resolve) =>
    setTimeout(() => {
      red.style.backgroundColor = "red";
      blue.style.backgroundColor = "blue";
      green.style.backgroundColor = "green";
      yellow.style.backgroundColor = "yellow";
      resolve(); // do nothing after waiting 400 ms, just alert the calling thread
    }, 100)
  );
}

//adds the sequence of colors to the sequence flashed in order
function addColors() {
  for (let i = 0; i < rounds; i++) {
    let random = Math.floor(Math.random() * array.length);
    sequence[i] == array[random];
  }
}

//increments the counter by 1 when the user clicks the correct colors in order
function updateCounter() {
  counter++;
  let currentStatus = document.getElementById("status");
  currentStatus.innerHTML = "Round " + counter + " of " + rounds;
}

//When the mouse hovers over a panel, it lights up.
async function startHover() {
  red.addEventListener("mouseover", async function () {
    red.style.backgroundColor = "white";
  });
  red.addEventListener("mouseout", async function () {
    await revert();
  });
  blue.addEventListener("mouseover", async function () {
    blue.style.backgroundColor = "white";
  });
  blue.addEventListener("mouseout", async function () {
    await revert();
  });
  green.addEventListener("mouseover", async function () {
    green.style.backgroundColor = "white";
  });
  green.addEventListener("mouseout", async function () {
    await revert();
  });
  yellow.addEventListener("mouseover", async function () {
    yellow.style.backgroundColor = "white";
  });
  yellow.addEventListener("mouseout", async function () {
    await revert();
  });
}

// async function displaySequence() {
//   for (let i = 0; i < counter; i++) {
//     await flash(sequence[i]);
//   }
// }

//The game itself. Different outcomes when a color button is pushed (win, lose, etc.)
function handleClick(color) {
  if (gameOn) {
    if (sequence[location] == color) {
      location++;
      if (location == counter) {
        currentStatus.innerHTML == "On to the next round.";
        nextRound.play();
        updateCounter();
        // displaySequence();
      }
    } else {
      currentStatus.innerHTML == "Sorry, you lose!";
      let loss = new Audio("sounds/wrong.wav");
      loss.play();
      document.body.style.backgroundColor = "crimson"; //resembles blood, which resembles a blow to pride.
      gameOn = false;
    }
    if (counter > rounds) {
      currentStatus.innerHTML == "Congratulations! You win!";
      let victory = new Audio("sounds/win.mp3");
      victory.play();
      document.body.style.backgroundColor = "gold"; //because gold is the color of victory
      gameOn = false;
    }
  }
}

//The function that showcases when a colored panel is clicked.
async function colorClicked() {
  red.addEventListener("mousedown", async function () {
    await flash(red);
    handleClick(red);
  });
  blue.addEventListener("mousedown", async function () {
    await flash(blue);
    handleClick(blue);
  });
  green.addEventListener("mousedown", async function () {
    await flash(green);
    handleClick(green);
  });
  yellow.addEventListener("mousedown", async function () {
    await flash(yellow);
    handleClick(yellow);
  });
}
