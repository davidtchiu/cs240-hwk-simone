//The app for the simone game
//@author Jaykob Walson
var gameOn = false; //this is to tell whether the game is playing or not. Will be set to true once the user presses start.
let rounds = document.getElementById("rounds");
let start = document.getElementById("play");
var red = document.getElementById("redSq");
var blue = document.getElementById("blueSq");
var green = document.getElementById("greenSq");
var yellow = document.getElementById("yellowSq");
var sequence = [];
var redBlink = new Audio("sounds/red.wav");
var blueBlink = new Audio("sounds/blue.wav");
var greenBlink = new Audio("sounds/green.wav");
var yellowBlink = new Audio("sounds/yellow.wav");
start.addEventListener("click", async function () {
  await gameStart();
  gameOn = true;
});
//makes the start animation of the game
async function gameStart() {
  console.log("game on!");
  var array = [red, blue, green, yellow];
  let blink = Math.floor(Math.random() * 20); //I've chosen for it to flash random tiles 20 times before the game.
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
          resolve(); // do nothing after waiting 400 ms, just alert the calling thread
        }, 400)
      );
    }
    await game();
  }

  async function game() {
    while (gameOn == true) {
      for (let i = 1; i <= rounds; i++) {
        for (let j = 1; j < i; j++) {
          let randomPick = Math.floor(Math.random() * array.length - 1);
          if (randomPick == 0) {
            let color = (red.style.backgroundColor = "red");
            await flash(color);
            color = red.style.backgroundColor = "red";
            sequence.add(color);
          } else if (randomPick == 1) {
            let color = (blue.style.backgroundColor = "blue");
            await flash(color);
            color = blue.style.backgroundColor = "blue";
            sequence.add(color);
          } else if (randomPick == 2) {
            let color = (green.style.backgroundColor = "green");
            await flash(color);
            color = green.style.backgroundColor = "green";
            sequence.add(color);
          } else if (randomPick == 3) {
            let color = (yellow.style.backgroundColor = "yellow");
            await flash(color);
            color = yellow.style.backgroundColor = "yellow";
            sequence.add(color);
          }
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve(); // do nothing after waiting 400 ms, just alert the calling thread
            }, 400)
          );
        }
      }
    }
  }

  let prompt = document.querySelectorAll(
    "redSq",
    "blueSq",
    "greenSq",
    "yellowSq"
  );

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
      }, 400)
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
      }, 400)
    );
  }
}
