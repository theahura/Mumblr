var argh = new Audio ("sound/argh.mp3");
			
function arghPlay() {
	argh.play();
	argh.currentTime = 0;
}

$(".button").click(function() {
	$("#screen1").slideUp();
	console.log("Success?");
})	

var recognizing = false;
var ignore_onend;
var start_timestamp;

//init recognition things
var recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = true;
recognition.interimResults = true;

var final_transcript;
var phrase = [];

recognition.onstart = function() {
	recognizing = true;
}

recognition.onerror = function(event) {
	if (event.error == 'no-speech') {
		ignore_onend = true;
	}
	if (event.error == 'not-allowed') {

	}
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

function startButton(event) {
	if (recognizing) {
		recognition.stop();
		return;
	}
	final_transcript = '';
	recognition.start();
	ignore_onend = false;
	start_timestamp = event.timeStamp;
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
