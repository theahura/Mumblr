$(document).ready(function(){	
	
	$("#downbutton").click(function() {
		$("#screen1").slideUp();
		console.log("ayy lmao?");
	});

	$(".header").click(function() {
		$("#screen1").slideDown();
	});

	//so proud of this
	$(".header").hover(function() {
		$(".header").css("background-color", "#84CB99");
		}, function() {
		$(".header").css("background-color", "#76C58E");	
	});	

})
