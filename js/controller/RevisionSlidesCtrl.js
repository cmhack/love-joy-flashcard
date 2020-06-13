app.controller('RevisionSlidesCtrl', function($scope, $timeout){

	document.getElementById('revisionSlides').style.height = (window.innerHeight * 0.75).toString() + 'px';
	
	var audio = new Audio('../audio/Fast Track.mp3');
	//audio.play();
	
	var menuList = [
		{title: "数字成语 第一册", id:"1"},
		{title: "数字成语 第二册", id:"2"},
		{title: "速读成语", id:"3"},
		{title: "华语 第一册", id:"4"},
		{title: "华语 第二册", id:"5"},
		{title: "华语 第三册", id:"6"},
		{title: "Bahasa Malaysia (A-B)", id:"7"},
		{title: "Bahasa Malaysia (C-D)", id:"8"},
		{title: "Bahasa Malaysia (E-F)", id:"9"},
		{title: "English (A-B)", id:"10"},
		{title: "English (C-D)", id:"11"},
		{title: "English (E-F)", id:"12"}];
	
	
	function resizeFont(){

		var div = document.getElementById('answerDiv');
		div.style.fontSize = "200%";
		
		if (0 > div.clientWidth - div.scrollWidth) {
		
			alert("Overflow");
			
			var fontSizeInPx =  getComputedStyle(div).getPropertyValue('font-size');
			fontSize = parseInt(fontSizeInPx.replace("px", ""));
			
			while(0 > div.clientWidth - div.scrollWidth){
				fontSize -= 1;
				div.style.fontSize = fontSize.toString() + 'px';
			}

		}
		
	}
	function resizeImage(){
		
		var img = document.getElementById('slideImage');
		
		var width = img.clientWidth;
		var height = img.clientHeight;
		
		if(width > height){
			img.style.width = "100%";
			img.style.height = "auto";
		}
		else{
			img.style.width = "auto";
			img.style.height = "100%";
		}
	}
	
	
	//-- get paramter from URL
	function getURLParameter(name) {
	  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	
	function playAudio(){
		
		if(!$scope.audioPlayed){
			var audio = new Audio('../audio/correct answer.mp3');
			audio.play();
		}
	}
	
	function countMark(){
		$scope.totalMark = 0;
		angular.forEach($scope.slides, function(obj){
			$scope.totalMark += obj.mark;
		});
	}
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ idioms revision <start> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	$scope.getQuestion = function(index){
		
		countMark();

		$scope.userAnswers = ["","","",""];
		$scope.message = '';
		
		if(index < 0){
			return;
		}
		if(index > $scope.slides.length-1){
			return;
		}

		$scope.currentIndex = index;
		
		//-- this question has been answered
		if($scope.slides[index].mark == 1){
			var text = $scope.slides[index].Text;
			$scope.userAnswers[0] = text.substring(0,1);
			$scope.userAnswers[1] = text.substring(1,2);
			$scope.userAnswers[2] = text.substring(2,3);
			$scope.userAnswers[3] = text.substring(3,4);
			
			$scope.shuffledOptions = [];
		}
		else{
		
			var text = $scope.slides[index].Text;
		
			var char1 = text.substring(0,1);
			var char2 = text.substring(1,2);
			var char3 = text.substring(2,3);
			var char4 = text.substring(3,4);
						
			var options = [];
			options.push(char1);
			options.push(char2);
			options.push(char3);
			options.push(char4);

			function shuffleArray(array) {
				for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
				return array;
			}
			
			$scope.shuffledOptions = shuffleArray(options);
		}
	
	}
	
	$scope.setAnswer = function(item){
		
		$scope.message = '';
		
		var userAnswer = "";
		
		
		//-- set selected answer to box
		for(var i=0; i<$scope.userAnswers.length; i++){

			if($scope.userAnswers[i] == ""){
				$scope.userAnswers[i] = item;
				break;
			}
		}
		
		for(var i=0; i<$scope.shuffledOptions.length; i++){

			if($scope.shuffledOptions[i] == item){
				$scope.shuffledOptions[i] = "";
				break;
			}
		}
		
		//-- check if last slot has been filled
		if($scope.userAnswers[$scope.userAnswers.length-1] != ""){
				
			for(var i=0; i<$scope.userAnswers.length; i++){
				userAnswer += $scope.userAnswers[i];
			}
			
			if(userAnswer == $scope.slides[$scope.currentIndex].Text){
				$scope.slides[$scope.currentIndex].mark = 1;
				countMark();
				
				playAudio();
			}
			else{
				var audio = new Audio('../audio/wrong answer.mp3');
				audio.currentTime = 0.5; //second
				audio.play();
			}
			
			$scope.shuffledOptions = [];
		}

	}
	
	$scope.clearUserAnswer = function(){
		
		$scope.message = '';
		for(var i=$scope.userAnswers.length-1; i>=0; i--){
			if($scope.userAnswers[i] != ""){
				$scope.userAnswers[i] = "";
				break;
			}
		}
	}
	
	$scope.showAnswer = function(){
		
		$scope.message = '';
		
		var text = $scope.slides[$scope.currentIndex].Text;
		
		var char1 = text.substring(0,1);
		var char2 = text.substring(1,2);
		var char3 = text.substring(2,3);
		var char4 = text.substring(3,4);
					
		var options = [];
		options.push(char1);
		options.push(char2);
		options.push(char3);
		options.push(char4);
		
		for(var i=0; i<$scope.userAnswers.length; i++){
			$scope.userAnswers[i] = options[i];
		}
		
		$scope.shuffledOptions = [];
		
		playAudio();
		
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ idioms revision <end> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ images revision <start> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$scope.getImageQuestion = function(index){
		
		countMark();
		
		$scope.message = '';
	
		if(index < 0){
			return;
		}
		if(index > $scope.slides.length-1){
			
			var audio = new Audio('../audio/cheering.mp3');
			audio.play();
			
			return;
		}
		
		$scope.currentIndex = index;
		
		//-- this question has been answered
		if($scope.slides[index].mark == 1){
			$scope.shuffledOptions = [$scope.slides[$scope.currentIndex].Text];
		}
		else{
			var array = [];
			
			array.push($scope.slides[$scope.currentIndex].Text);
				
			for(var i=0; i<3; i++){
				
				var isNumExist = true;
				
				while(isNumExist){
					
					var num = Math.floor((Math.random() * $scope.slides.length-1) + 0);
					
					if(num >= 0 && num < $scope.slides.length){
						var found = false;
						for(var j=0; j<array.length; j++){
							if($scope.slides[num].Text == array[j]){
								found = true;
							}
						}
							
						if(!found){
							isNumExist = false;
							array.push($scope.slides[num].Text);
						}	
					}
				} //-- end while
			} //-- end for
						
			function shuffleArray(array) {
				for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
				return array;
			}
			
			$scope.shuffledOptions = shuffleArray(array);
		}
		
		/*
		var imgTimer = $timeout(function(){
			resizeImage();
			$timeout.cancel(imgTimer);
		},50);
		*/
		
	}
	
	$scope.checkAnswer = function(item){
		if(item == $scope.slides[$scope.currentIndex].Text){
			
			$scope.slides[$scope.currentIndex].mark = 1;
			$scope.shuffledOptions = [$scope.slides[$scope.currentIndex].Text];
			
			playAudio();
		}
		else{
			
			var audio = new Audio('../audio/wrong answer.mp3');
			audio.currentTime = 0.5; //second
			audio.play();
			
		}
		
		countMark();
	
	}
	
	$scope.showImageAnswer = function(){
		$scope.message = '';
		$scope.shuffledOptions = [$scope.slides[$scope.currentIndex].Text];
		playAudio();
	}
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ images revision <end> ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	$scope.decreaseIndex = function(){
		if($scope.currentIndex != 0){
			$scope.currentIndex -= 1;
			
			/*
			var imgTimer = $timeout(function(){
				resizeImage();
				$timeout.cancel(imgTimer);
			},50);
			*/
		}
	}
	$scope.increaseIndex = function(){
		$scope.currentIndex += 1;

		/*
		var imgTimer = $timeout(function(){
			resizeImage();
			$timeout.cancel(imgTimer);
		},50);
		*/
	}
	
	if(getURLParameter('cardID') != null && getURLParameter('topicID') != null){
		
		//-- conver string to int
		$scope.cardID = parseInt(getURLParameter('cardID'), 10);
		$scope.topicID = parseInt(getURLParameter('topicID'), 10);
		
		for(var i=0; i<menuList.length; i++){
			if($scope.cardID == menuList[i].id){
				$scope.cardTitle = menuList[i].title;
				break;
			}
		}
		
		//---------------------------------------- 数字成语 第一册 ----------------------------------------
		if($scope.cardID == 1){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "Chinese";
			
			$.ajax({
				url: "idioms.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					$scope.getQuestion($scope.currentIndex);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 数字成语 第二册 ----------------------------------------
		if($scope.cardID == 2){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "Chinese";
			
			$.ajax({
				url: "idioms.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					$scope.getQuestion($scope.currentIndex);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 速读成语 ----------------------------------------
		if($scope.cardID == 3){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "Chinese";
			
			$.ajax({
				url: "idioms.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					$scope.getQuestion($scope.currentIndex);
					
					$scope.$apply();
					
				}
			});
		}

		//---------------------------------------- 华语 第一册 ----------------------------------------
		if($scope.cardID == 4){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "Chinese";
			
			$.ajax({
				url: "ChineseActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					/*
					var imgTimer = $timeout(function(){
						resizeImage();
						$timeout.cancel(imgTimer);
					},50);
					*/
					
					$scope.$apply(function(){
						$scope.getImageQuestion($scope.currentIndex);
					});
					
				}
			});
		}
		
		//---------------------------------------- 华语 第二册 ----------------------------------------
		if($scope.cardID == 5){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "Chinese";
			
			$.ajax({
				url: "ChineseActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					/*
					var imgTimer = $timeout(function(){
						resizeImage();
						$timeout.cancel(imgTimer);
					},50);
					*/
					
					$scope.$apply(function(){
						$scope.getImageQuestion($scope.currentIndex);
					});
					
				}
			});
		}
		
		//---------------------------------------- 华语 第三册 ----------------------------------------
		if($scope.cardID == 6){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "Chinese";
			
			$.ajax({
				url: "ChineseActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					/*
					var imgTimer = $timeout(function(){
						resizeImage();
						$timeout.cancel(imgTimer);
					},50);
					*/
					
					$scope.$apply(function(){
						$scope.getImageQuestion($scope.currentIndex);
					});
					
				}
			});
		}
		
		//---------------------------------------- Bahasa Malaysia (A-B) ----------------------------------------
		if($scope.cardID == 7){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "Malay";
			
			$.ajax({
				url: "MalayActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					var imgTimer = $timeout(function(){
						resizeFont();
						//resizeImage();
						$timeout.cancel(imgTimer);
					},50);
					
					$scope.$apply(function(){
						$scope.getImageQuestion($scope.currentIndex);
					});
					
				}
			});
		}
		
		//---------------------------------------- Bahasa Malaysia (C-D) ----------------------------------------
		if($scope.cardID == 8){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "Malay";
			
			$.ajax({
				url: "MalayActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					var imgTimer = $timeout(function(){
						resizeFont();
						//resizeImage();
						$timeout.cancel(imgTimer);
					},50);
					
					$scope.$apply(function(){
						$scope.getImageQuestion($scope.currentIndex);
					});
					
				}
			});
		}
		
		//---------------------------------------- Bahasa Malaysia (E-F) ----------------------------------------
		if($scope.cardID == 9){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "Malay";
			
			$.ajax({
				url: "MalayActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					var imgTimer = $timeout(function(){
						resizeFont();
						//resizeImage();
						$timeout.cancel(imgTimer);
					},50);
					
					$scope.$apply(function(){
						$scope.getImageQuestion($scope.currentIndex);
					});
					
				}
			});
		}
		
		//---------------------------------------- English (A-B) ----------------------------------------
		if($scope.cardID == 10){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "English";
			
			$.ajax({
				url: "EnglishActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					var imgTimer = $timeout(function(){
						resizeFont();
						//resizeImage();
						$timeout.cancel(imgTimer);
					},50);
					
					$scope.$apply(function(){
						$scope.getImageQuestion($scope.currentIndex);
					});
					
				}
			});
		}
		
		//---------------------------------------- English (C-D) ----------------------------------------
		if($scope.cardID == 11){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "English";
			
			$.ajax({
				url: "EnglishActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					var imgTimer = $timeout(function(){
						resizeFont();
						//resizeImage();
						$timeout.cancel(imgTimer);
					},50);
					
					$scope.$apply(function(){
						$scope.getImageQuestion($scope.currentIndex);
					});
					
				}
			});
		}
		
		//---------------------------------------- English (E-F) ----------------------------------------
		if($scope.cardID == 12){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.language = "English";
			
			$.ajax({
				url: "EnglishActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							break;
						}
					}
					
					angular.forEach($scope.slides, function(obj){
						obj.mark = 0;
					});
					
					var imgTimer = $timeout(function(){
						resizeFont();
						//resizeImage();
						$timeout.cancel(imgTimer);
					},50);
					
					$scope.$apply(function(){
						$scope.getImageQuestion($scope.currentIndex);
					});
					
				}
			});
		}
		
	}
	
});