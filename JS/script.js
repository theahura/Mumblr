
var absoluteCrutch = {}
var potentialCrutch = {}

var currentTranscript = "";
var currentIndex = 0;

var buffer = [];
var timeBuffer = [];
var bufferSize = 4;

var waitingForResponses = 0;
var weight = 0.0;

var recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 1;
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
    //  console.log("Your shit is blocked dude");
    } else {
   //   console.log("You've been denied access dude");
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

  var transcript =  event.results[0][0].transcript;

  //checks the transcript
  if(currentTranscript !== transcript && event.results[0][0].confidence > .75)
  {
    currentTranscript = transcript;

    var transcriptArray = transcript.split(" ");

    var shortenedArray = transcriptArray.splice(0, i);

    for(var i = 0; i < shortenedArray.length; i++)
    {
      if(i > bufferSize)
        break

      buffer.push(shortenedArray[i])

      if(buffer.length > bufferSize)
        buffer.splice(0, 1)
    }

    if (checkAbsoluteCrutchWords(buffer)) 
    {
      arghPlay();
    }
    else if(checkPotentialCrutchWords(buffer))
    {
      weight += 0.025;
      var bufString = buffer.join(" ");
      checkNGram(bufString);
      waitingForResponses++;
    }
    else
    {
      currentIndex = transcriptArray.length - 1;

      if(waitingForResponses == 0)
        weight = 0.0;
    }  
  }
}


function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  recognition.start();
  updateCrutchWords();
  ignore_onend = false;
 // console.log("Start!");
  start_timestamp = event.timeStamp;
}

var argh = new Audio ("argh.mp3");

function updateCrutchWords()
{
  absoluteCrutch = $("#crutchWords").html().split(" ");
  potentialCrutch = $("#sometimesCrutchWords").html().split(" ");
}