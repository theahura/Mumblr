

var fourTree = {}
var threeTree = {}

function doesNGramExist(tree, ngram)
{
	if(ngram.length <= 0)
		return true

	var nextNode = tree[ngram[0]]
	if(nextNode)
	{
		ngram.splice(0, 1)
		return doesNGramExist(nextNode, ngram)
	}
	return false
}

function printTree(tree, tab)
{
	var spaces = ""
	for(var i = 0; i < tab; i++)
	{
		spaces = spaces + "---"
	}

	for(i in tree)
	{
		console.log(":" + spaces + i)
		printTree(tree[i], tab + 1)
	}
}

//opens folder, creates tree
fs = require('fs')

fs.readFile('w4_.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log("TREE BUILDING FOUR STARTED");
  var temparray = data.split(/[\t\r\n]+/);

  for (var i = 0; i < temparray.length; i += 5) 
  {
    var currTree = fourTree;

    for (var j = 1; j < 5; j++) {
        if (temparray[i + j] in currTree) {
            currTree = currTree[temparray[i + j]];
        } else {
            currTree[temparray[i + j]] = {};
            currTree = currTree[temparray[i + j]];
        }
        //temparray[i+j] = undefined;
    }
  }

  console.log("TREE BUILDING FOUR COMPLETE");
  console.log(doesNGramExist(fourTree, ["one", "of", "the", "loudest"]));
});

fs.readFile('w3_.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log("TREE BUILDING THREE STARTED");
  var temparray = data.split(/[\t\r\n]+/);
  
  for (var i = 0; i < temparray.length; i += 4) 
  {
    var currTree = threeTree;

    for (var j = 1; j < 4; j++) {
        if (temparray[i + j] in currTree) {
            currTree = currTree[temparray[i + j]];
        } else {
            currTree[temparray[i + j]] = {};
            currTree = currTree[temparray[i + j]];
        }
        //temparray[i+j] = undefined;
    }
  }

  console.log("TREE BUILDING THREE COMPLETE");

  console.log(doesNGramExist(threeTree, ["i", "love", "you"]));
});

//starts not tree building stuff
var io = require('socket.io').listen(3004);

//On an io socket connection...
io.sockets.on('connection', function(socket) 
{
	socket.on('clientToServer', function(data)
	{
		if(!(data && data.name))
			serverError(socket, "Data did not have a name");

		serverHandler(socket, data);
	});

});

function serverError(socket, message)
{
	socket.emit('ServerToClient',{
		name: "Error",
		message: message
	});
}

function serverHandler(socket, incomingObj)
{
	if(incomingObj.name == "checkNGram")
	{
		if(!incomingObj.ngram)
			serverError(socket, "No ngram found");

		if(incomingObj.ngram.length == 3)
			checkThreeTree(socket, incomingObj.ngram);
		else if (incomingObj.ngram.length == 4)
			checkFourTree(socket, incomingObj.ngram);
		else if (incomingObj.ngram.length == 5)
			checkFiveTree(socket, incomingObj.ngram);
		else
			serverError(socket, "ngram not the right length <3, 4, 5>");
	}
}

function checkThreeTree(socket, data)
{
	if(threeTree.doesNGramExist(data))
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: true
		});	
	}
	else
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: false
		});
	}
}

function checkFourTree(socket, data)
{
	if(fourTree.doesNGramExist(data))
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: true
		});
	}
	else
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: false
		});
	}
}

function checkFiveTree(socket, data)
{
	if(fiveTree.doesNGramExist(data))
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: true
		});	
	}
	else
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: false
		});
	}
}