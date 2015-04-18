

var create_email = false;
var final_transcript = '';
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
    if (!final_transcript) {
      console.log("START")
      return;
    }

  };


  recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {

      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {

        var temp_transcript = interim_transcript;
        if (!checkBadWords(temp_transcript))
        	interim_transcript += event.results[i][0].transcript;
      }
    }

    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);

    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
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

	  final_transcript = '';
	  recognition.start();
	  ignore_onend = false;
	  final_span.innerHTML = '';
	  interim_span.innerHTML = '';
	  start_img.src = 'microphone-disabled.png';
	  console.log("Allow");
	  start_timestamp = event.timeStamp;
	}
	var argh = new Audio ("argh.mp3");
			
	function arghPlay() {
		argh.play();
		argh.currentTime = 0;
	}
	function checkBadWords(transcript) {
	  var bool = false;
	  var uh = "uh";
	  var um = "um";
	  var like = "like";

	  if (transcript.indexOf(uh) > -1 || transcript.indexOf(um) > -1) {
	    arghPlay();
	    bool = true;
	  }

	  if (transcript.indexOf(like) > -1) {
	    arghPlay();
	    bool = true;
	  }

	  return bool;
	}