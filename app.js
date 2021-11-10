//The app for the simone game
//@author Jaykob Walson
var gameOn = false; //this is to tell whether the game is playing or not. Will be set to true once the user presses start.
let rounds = document.getElementById("rounds");
let start = document.getElementById("play");
start.addEventListener("click", function () {
  gameStart();
  gameOn = true;
});
//makes the start animation of the game
async function gameStart() {
  var red = document.getElementById("redSq");
  var blue = document.getElementById("blueSq");
  var green = document.getElementById("greenSq");
  var yellow = document.getElementById("yellowSq");
  var array = [red, blue, green, yellow];
  let flash = Math.floor(Math.random() * 20 + 1); //I've chosen for it to flash random tiles 20 times before the game.
  for (let i = 0; i < flash; i++) {
    let randomPick = Math.floor(Math.random() * array.length - 1);
    if (randomPick == 0) {
      let redColor = red.style.backgroundColor();
      flash(redColor);
    } else if (randomPick == 1) {
      let blueColor = blue.style.backgroundColor();
      flash(blueColor);
    }
    if (randomPick == 2) {
      let greenColor = green.style.backgroundColor();
      flash(greenColor);
    }
    if (randomPick == 3) {
      let yellowColor = yellow.style.backgroundColor();
      flash(yellowColor);
    }
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(); // do nothing after waiting 400 ms, just alert the calling thread
      }, 400)
    );
  }
}

async function game() {
  while (gameOn == true) {
    for (let i = 1; i <= rounds; i++) {
      for (let j = 1; j < i; j++) {
        let randomPick = Math.floor(Math.random() * array.length - 1);
        let sequence = [];
        if (randomPick == 0) {
          let color = (red.style.backgroundColor = "hotpink");
          sequence.add(color);
        } else if (randomPick == 1) {
          let color = (blue.style.backgroundColor = "lightblue");
          sequence.add(color);
        }
        if (randomPick == 2) {
          let color = (green.style.backgroundColor = "lightgreen");
          sequence.add(color);
        }
        if (randomPick == 3) {
          let color = (yellow.style.backgroundColor = "lightyellow");
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
function flash(colorType) {
  await new Promise((resolve) =>
    setTimeout(() => {
      if (colorType == red.style.backgroundColor) {
        colorType == "hotpink";
      } else if (colorType == blue.style.backgroundColor) {
        colorType == "lightblue";
      } else if (colorType == green.style.backgroundColor) {
        colorType == "lightgreen";
      } else if (colorType == yellow.style.backgroundColor) {
        colorType == "lightyellow";
      }
      resolve(); // do nothing after waiting 400 ms, just alert the calling thread
    }, 400)
  );
}
