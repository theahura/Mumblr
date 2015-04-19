
function Tree(inputValue)
{
	var children = {}
	var value = "base";

	if(inputValue)
		value = inputValue


	this.getValue = function()
	{
		return value
	}

	this.findChildTree = function(inputString)
	{
		return children[inputString]
	}

	this.push = function(childValue)
	{
		children[childValue] = new Tree(childValue)
		return children[childValue]
	}

	this.doesNGramExist = function(ngram)
	{
		if(ngram.length <= 0)
			return true

		var nextNode = this.findChildTree(ngram[0])
		if(nextNode)
		{
			ngram.splice(0, 1)
			return nextNode.doesNGramExist(ngram)
		}
		return false
	}

	this.createTree = function(data, n)
	{
		n = n+1
		for(var i = 0; i < data.length; i += n)
		{
			//console.log(i + " " + data[i])
			var currentTree = this
			for(var j = 1; j < n; j++)
			{
				var childTree = currentTree.findChildTree(data[i+j])
				if(childTree)
				{
					currentTree = childTree
				}
				else
				{
					currentTree = currentTree.push(data[i+j])
				}
			}
		}
	}

	this.print = function(tab)
	{
		var spaces = ""
		for(var i = 0; i < tab; i++)
		{
			spaces = spaces + "---"
		}

		for(i in children)
		{
			console.log(":" + spaces + children[i].getValue())
			children[i].print(tab + 1)
		}
	}
}

var fiveTree = new Tree();
var fourTree = new Tree();
var threeTree = new Tree();

//opens folder, creates tree
fs = require('fs')

fs.readFile('w5_.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var temparray = data.split(/[\t\r\n]+/)
  fiveTree.createTree(temparray, 5)
});

fs.readFile('w4_.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var temparray = data.split(/[\t\r\n]+/)
  fiveTree.createTree(temparray, 4)
});

fs.readFile('w3_.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var temparray = data.split(/[\t\r\n]+/)
  fiveTree.createTree(temparray, 3)
});


var io = require('socket.io').listen(3004);

//On an io socket connection...
io.sockets.on('connection', function(socket) 
{
	socket.on('clientToServer', function(data)
	{
		if(!(data && data.name))
			serverError(socket, "Data did not have a name")

		serverHandler(socket, data)
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
			serverError(socket, "No ngram found")

		if(incomingObj.ngram.length == 3)
			checkThreeTree(socket, incomingObj.ngram)
		else if (incomingObj.ngram.length == 4)
			checkFourTree(socket, incomingObj.ngram)
		else if (incomingObj.ngram.length == 5)
			checkFiveTree(socket, incomingObj.ngram)
		else
			serverError(socket, "ngram not the right length <3, 4, 5>")
	}
}

function checkThreeTree(socket, data)
{
	if(threeTree.doesNGramExist(data))
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: true
		})	
	}
	else
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: false
		})
	}
}

function checkFourTree(socket, data)
{
	if(fourTree.doesNGramExist(data))
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: true
		})	
	}
	else
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: false
		})
	}
}

function checkFiveTree(socket, data)
{
	if(fiveTree.doesNGramExist(data))
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: true
		})	
	}
	else
	{
		socket.emit('ServerToClient',{
			name: "NGramResponse",
			value: false
		})
	}
}