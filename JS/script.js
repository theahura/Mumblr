var argh = new Audio ("sound/argh.mp3");
			
function arghPlay() {
	argh.play();
	argh.currentTime = 0;
}


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
	if (event.error == 'audio-capture') {
		ignore_onend = true;
	}
	if (event.error == 'not-allowed') {
		ignore_onend = true;
	}
}

recognition.onend = function() {
	recognizing = false;	
	if (ignore_onend) {
		return;
	}
	if (!final_transcript) {
		return;
	}
}

recognition.onresult = function(event) {
	 var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
}

function startButton(event) {
	if (recognizing) {
		recognition.stop();
		return;
	}
	final_transcript = '';
	recognition.start();
	ignore_onend = false;
	final_span.innerHTML = '';
 	interim_span.innerHTML = '';
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
