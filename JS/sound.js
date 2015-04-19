var arghRandom = new Audio("argh.mp3")
function arghRandom() {
  var arghs = ["argh.mp3", "argh1.mp3", "argh.mp2", "argh.mp3", "argh.mp4", "argh.mp5", "argh.mp6", "argh.mp7", "argh.mp8"];
  var rand = arghs[Math.floor(Math.random() * arghs.length)];
  var arghRandom = arghs[rand];
  arghRandom.play();
  arghRandom.currentTime = 0;
}