
var recognizing = false;
var ignore_onend;
var start_timestamp;

var phrase = ['', '', '', '', ''];

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 0;
  console.log("working");

  recognition.onstart = function() {
    recognizing = true;
    console.log("Speak now");
    console.log("working!")
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

    if (false) {
      console.log("START");
      return;
    }

  };


  recognition.onresult = function(event) {
    var interim_transcript;
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      console.log(event.results[0][i]);
      phrase.push(event.results[0][i]);
      phrase.splice(0, 1);
      console.log(phrase);
    }
  }


	var two_line = /\n\n/g;
	var one_line = /\n/g;


	function linebreak(s) {
	  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
	}

	var first_char = /\S/;


	function capitalize(s) {
	  return s.replace(first_char, function(m) { return m.toUpperCase(); });
	}

	function startButton() {
	  if (recognizing) {
	    recognition.stop();
	    return;
	  }
    interim_transcript = '';
	  recognition.start();
	  ignore_onend = false;
	  console.log("Allow");
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