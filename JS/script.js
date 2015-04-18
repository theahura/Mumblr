var argh = new Audio ("argh.mp3");
			
function arghPlay() {
	argh.play();
	argh.currentTime = 0;
}

var recognizing = false;


//init recognition things
var recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = true;
recognition.interimResults = true;

var phrase = [];

recognition.onstart = function() {
	recognizing = true;
}

recognition.onend = function() {
	recognizing = false;
}

recognition.onresult = function(event) {
	
}


//main function for speech interruption
function speechAnalysis() {
	if ("um" in recognition) {
		arghPlay();
	}
	if ("uh in recognition") {
		arghPlay();
	}
	if ("like" in recognition) {
		arghPlay();
	}
}