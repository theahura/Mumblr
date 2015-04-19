
var phrase = ['', '', '', ''];

var recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 0;
var recognizing = false;
var ignore_onend;
var start_timestamp;

recognition.onstart = function() {
  recognizing = true;
};


recognition.onerror = function(event) {

  if (event.error == 'no-speech') {
    console.log("No speech detected");
    ignore_onend = true;
  }

  if (event.error == 'audio-capture') {
    console.log("There appears to be no microphone");
    ignore_onend = true;
  }

  if (event.error == 'not-allowed') {
    if (event.timeStamp - start_timestamp < 100) {
      console.log("Your shit is blocked dude");
    } else {
      console.log("You've been denied access dude");
    }
    ignore_onend = true;
  }

};


recognition.onend = function() {

  recognizing = false;
  if (ignore_onend) {
    return;
  }

};


recognition.onresult = function(event) {

  for (var i = event.resultIndex; i < event.results.length; ++i) {

    console.log(event.results[0][i].transcript);
    phrase.push(event.results[0][i].transcript);
    phrase.splice(0, 1);
    console.log(phrase);

    for (word in phrase) {

      if (checkCrutchWords(word)) {
        arghPlay();
        phrase.remove(phrase.indexOf(word));
        recognition.stop();
        recognition.start();
      }
    }

  }
}


function startButton() {
  if (recognizing) {
    recognition.stop();
    return;
  }
  recognition.start();
  ignore_onend = false;
  console.log("Start!");
  start_timestamp = event.timeStamp;

}

var argh = new Audio ("argh.mp3");
		
function arghPlay() {
	argh.play();
	argh.currentTime = 0;
}

function checkCrutchWords(transcript) {
  var bool = false;

  if (transcript.indexOf("uh") > -1 || transcript.indexOf("um") > -1) {
    arghPlay();
    bool = true;
  }

  if (transcript.indexOf("like") > -1) {
    arghPlay();
    bool = true;
  }

  return bool;
}