$("#startbutton").click(function() {
	localStorage.crutchwords = document.getElementById("crutchwords").innerHTML;
	startButton();
});

if (localStorage.crutchwords) {
	document.getElementById("crutchwords").innerHTML = crutchwords;
}