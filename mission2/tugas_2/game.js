const mario = document.getElementById("mario");
const obstacle = document.getElementById("obstacle");

function jump() {
  if (mario.classList != "jump") {
    mario.classList.add("jump");

    setTimeout(function () {
      mario.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  // get current dino Y position
  let marioTop = parseInt(
    window.getComputedStyle(mario).getPropertyValue("top")
  );

  // get current cactus X position
  let obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );

  // detect collision
  if (obstacleLeft < 50 && obstacleLeft > 0 && marioTop >= 100) {
    // collision
    alert("Game Over!");
  }
}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});
