var arghRandom = new Audio("argh.mp3")
function arghRandom() {
  var arghs = ["argh.mp3", "argh1.mp3", "argh2.mp3", "argh3.mp3", "argh4.mp3", "argh5.mp3", "argh6.mp3", "argh7.mp3", "argh8.mp3"];
  var rand = arghs[Math.floor(Math.random() * arghs.length)];
  var arghRandom = arghs[rand];
  arghRandom.play();
  arghRandom.currentTime = 0;
}