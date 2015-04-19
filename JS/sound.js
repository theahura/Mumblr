var arghRandom = new Audio("argh.mp3")

// function playArghRandom() 
// {
//   var arghs = ["argh.mp3", "argh1.mp3", "argh2.mp3", "argh3.mp3", "argh4.mp3", "argh5.mp3", "argh6.mp3", "argh7.mp3", "argh8.mp3"];
//   var rand = Math.floor(Math.random() * arghs.length);
//   arghRandom = new Audio(arghs[rand]);
//   arghRandom.play();
//   arghRandom.currentTime = 0;
// }

function arghPlay()
{
	arghRandom.play()
	waitingForResponses = 0;
    weight = 0.0;
}