var argh = new Audio ("sound/argh.mp3");
			
function arghPlay() {
	argh.play();
	argh.currentTime = 0;
}


$(".button").click(function() {
	$("#screen1").slideUp();
	console.log("Success?");
})	