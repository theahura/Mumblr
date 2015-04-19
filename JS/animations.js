//slides everythng under "screen1" up
$("#upbutton").click(function() {
	$("#screen1").slideUp();

	//stores the field contents locally
	localStorage.crutchWords = document.getElementById("crutchWords").innerHTML;
	localStorage.sometimesCrutchWords = document.getElementById("sometimesCrutchWords").innerHTML;

	updateCrutchWords();
});

//slides everythin under "screen1" down
$("#downbutton").click(function() {
	$("#screen1").slideDown();
});

//so proud of this light-up animation
$(".header").hover(function() {
	$(".header").css("background-color", "#84CB99");
	}, function() {
	$(".header").css("background-color", "#76C58E");	
});	

