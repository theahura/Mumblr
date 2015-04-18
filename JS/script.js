var argh = new Audio ("sound/argh.mp3");
			
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
	var i; 
	for (i = 0; i < 4; i++)
	{
		phrase[i] = idunno;
	}
	speechAnalysis(phrase);
}


//main function for speech interruption
function speechAnalysis(list) {
	if ("um" in list) {
		arghPlay();
	}
	if ("uh" in list) {
		arghPlay();
	}
	if ("like" in list) {
		arghPlay();
	}
}
>>>>>>> origin/master
