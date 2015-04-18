

var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;


if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {

  start_button.style.display = 'inline-block';
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

    if (create_email) {
      create_email = false;
      createEmail();
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
 

	function upgrade() {
	  start_button.style.visibility = 'hidden';
	  console.log("Upgrade your shit!");
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


	function createEmail() {
	  var n = final_transcript.indexOf('\n');
	  if (n < 0 || n >= 80) {
	    n = 40 + final_transcript.substring(40).indexOf(' ');
	  }
	  var subject = encodeURI(final_transcript.substring(0, n));
	  var body = encodeURI(final_transcript.substring(n + 1));
	  window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
	}


	function copyButton() {
	  if (recognizing) {
	    recognizing = false;
	    recognition.stop();
	  }
	  copy_button.style.display = 'none';
	}


	function emailButton() {
	  if (recognizing) {
	    create_email = true;
	    recognizing = false;
	    recognition.stop();
	  } else {
	    createEmail();
	  }
	  email_button.style.display = 'none';
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
	  showButtons('none');
	  start_timestamp = event.timeStamp;
	}

	var current_style;

	function showButtons(style) {
	  
	  if (style == current_style) {
	    return;
	  }

	  current_style = style;
	  copy_button.style.display = style;
	  email_button.style.display = style;

	}


	function checkBadWords(transcript) {
		var bool = false;

		if ("uh" in transcript || "um" in transcript) {
			//PLAY ARGH
			bool = true;
		}

		if ("like" in transcript) {
			bool = true;
		}

		return bool;
	}
}