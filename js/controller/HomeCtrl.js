app.controller('HomeCtrl', function($scope){
	
	document.getElementById("backgroundImage").style.height = window.innerHeight + "px";
	
	$scope.soundON = true;
	
	var audio = new Audio('audio/Fast Track.mp3');
	audio.play();
	
	$scope.playAudio = function(param){
		
		if(param){
			audio.play();
		}
		else{
			audio.pause();
		}
	}

});
