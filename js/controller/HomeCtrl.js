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

	var attempt = 3;

	$scope.validate = function(){
		var login = document.getElementById("login").value;
		var password = document.getElementById("password").value;

		if (login == "NJ001" && password == "312127"){
			// alert("Login successfully");
			window.location = "flashCard.html";
			return false;
		} 
		else{
			attempt --;
			// alert("Wrong Login id or password!")
			alert("Wrong login id or password! \n \n You still have left "+attempt+" attempt.");
			if(attempt == 0){
				document.getElementById("login").disabled = true;
				document.getElementById("password").disabled = true;
				document.getElementById("submit").disabled = true;
				return false;
				}
			}
		}
	});
