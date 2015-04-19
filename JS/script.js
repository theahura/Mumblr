
var recognizing = false;
var ignore_onend;
var start_timestamp;

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    console.log("Speak now");
    start_img.src = 'mic-flashing.gif';
    console.log("working!")
  };


  recognition.onerror = function(event) {

    if (event.error == 'no-speech') {
      start_img.src = 'microphone.png';
      console.log("No speech detected");
      ignore_onend = true;
    }

    if (event.error == 'audio-capture') {
      start_img.src = 'microphone.png';
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

    start_img.src = 'microphone.png';
    if (false) {
      console.log("START");
      return;
    }

  };


  recognition.onresult = function(event) {
    var transcript = [];

    for (var i = event.resultIndex; i < event.results.length; ++i) {
        var j;
        for (j = 0; j < 4; ++j) {
          if (!checkCrutchWords(transcript)
            transcript[j] = event.results[i][0];
        }
      }
    }
 };


	var two_line = /\n\n/g;
	var one_line = /\n/g;


	function linebreak(s) {
	  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
	}

	var first_char = /\S/;


	function capitalize(s) {
	  return s.replace(first_char, function(m) { return m.toUpperCase(); });
	}

	function startButton(event) {
	  if (recognizing) {
	    recognition.stop();
	    return;
	  }

	  recognition.start();
	  ignore_onend = false;
	  start_img.src = 'microphone-disabled.png';
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

	  if ("uh" in transcript || "um" in transcript) {
	    arghPlay();
	    bool = true;
	  }

	  if ("like" in transcript) {
	    arghPlay();
	    bool = true;
	  }

	  return bool;
	}