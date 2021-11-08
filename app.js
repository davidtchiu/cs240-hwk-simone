//The app for the simone game
//@author Jaykob Walson
var gameOn = false; //this is to tell whether the game is playing or not. Will be set to true once the user presses start.
let rounds = document.getElementById("rounds");
rounds.addEventListener("text", function () {
  const rounds = parseInt(document.getElementById("rounds").placeHolder);
  gameStart();
  var gameOn = true;
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
      red.style.backgroundColor = "hotpink";
    } else if (randomPick == 1) {
      blue.style.backgroundColor = "lightblue";
    }
    if (randomPick == 2) {
      green.style.backgroundColor = "lightgreen";
    }
    if (randomPick == 3) {
      yellow.style.backgroundColor = "lightyellow";
    }
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(); // do nothing after waiting 100 ms, just alert the calling thread
      }, 400)
    );
  }
}

async function game() {
  while (gameOn == true) {
    let rounds = parseInt(document.getElementById("rounds"));
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
function flash(colorType) {}
