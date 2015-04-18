var argh = new Audio ("argh.mp3");
			
function arghPlay() {
	argh.play();
	argh.currentTime = 0;
}

//init recognition things
var recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";

//main function for speech interruption
