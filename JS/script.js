
var absoluteCrutch = []
var potentialCrutch = []

var currentTranscript = "";
var currentIndex = 0;

var currentTriggeredWord = "";
var minimumIndicesPassed = 0;

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


recognition.onresult = function(event) 
{
   var transcript =  event.results[event.results.length - 1][0].transcript;

  //checks the transcript
  if(currentTranscript !== transcript && event.results[event.results.length - 1][0].confidence > .75)
  {
    currentTranscript = transcript;

    console.log(transcript)

    var transcriptArray = transcript.split(" ");
    
    if(minimumIndicesPassed > 0)
      minimumIndicesPassed--

    for(var j = 4; j > 0; j--)
    {
      if(j < transcriptArray.length)
      {
        buffer.push(transcriptArray[transcriptArray.length - j].toLowerCase())
      }

      if(buffer.length > bufferSize)
        buffer.splice(0, 1)
    }

    console.log(buffer)
 
    if (checkAbsoluteCrutchWords(buffer)) 
    {
      arghPlay();
    }
    else if(checkPotentialCrutchWords(buffer))
    {
      console.log(weight);
      weight += 0.025;
      var bufString = buffer.join(" ");
      checkNGram(bufString);
      waitingForResponses++;
      console.log(waitingForResponses);
    }
    else
    {
      if(waitingForResponses == 0)
        weight = 0.0;
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
 // console.log("Start!");
}

var argh = new Audio ("argh.mp3");

function updateCrutchWords()
{
  absoluteCrutch = $("#crutchWords").html().split(" ");
  potentialCrutch = $("#sometimesCrutchWords").html().split(" ");
}

function checkAbsoluteCrutchWords(buffer)
{
  for(var i = 0; i < buffer.length; i++)
  {
    if(absoluteCrutch.indexOf(buffer[i]) != -1)
    {
      if(currentTriggeredWord != buffer[i] || minimumIndicesPassed == 0)
      {
        console.log(buffer[i])
        console.log(minimumIndicesPassed)
        currentTriggeredWord = buffer[i];
        minimumIndicesPassed = bufferSize;
        console.log("crutch found");
        return true;
      }

    }
  }

  return false;
}

function checkPotentialCrutchWords(buffer)
{
  console.log(buffer)
  for(var i = 0; i < buffer.length; i++)
  {
    if(potentialCrutch.indexOf(buffer[i]) != -1)
    {
      return true;
    }
  }
  
  return false;
}