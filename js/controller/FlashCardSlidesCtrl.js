app.controller('FlashCardSlidesCtrl', function($scope, $interval, $timeout, $window){

	document.getElementById('flashCardSlides').style.height = (window.innerHeight * 0.75).toString() + 'px';

	var speed = 1.0;
	document.getElementById("button"+speed).disabled = true;

	$scope.speed = function(param){
		document.getElementById("button"+speed).disabled = false;
		document.getElementById("button"+param).disabled = true;
		speed = param;
	}
	
	function setAnimation(){
		document.getElementById('flashCardSlides').className = 'slide slideInDown animated';
		var timer = $timeout(function(){
			document.getElementById('flashCardSlides').className = "slide";
			$scope.playAudio($scope.slides[$scope.currentIndex]);
			$timeout.cancel(timer);
		},1000/speed);
	}
	
	$scope.autoPlaySlide = function(bool, direction){
		
		$scope.playAudio($scope.slides[$scope.currentIndex]);
		
		if(bool){
			$scope.slideInterval = $interval(function(){
				
				if(direction == 'forward' && $scope.currentIndex == $scope.slides.length-1){
					$scope.autoPlay = false;
					$interval.cancel($scope.slideInterval);
					
					if($scope.playAll == 1){
						var topicID = $scope.topicID + 1;
						
						if(topicID <= $scope.lastIndex){
							$window.open("flashCardSlides.html?cardID="+$scope.cardID+"&topicID="+topicID+"&firstIndex="+$scope.firstIndex+"&lastIndex="+$scope.lastIndex+"&playAll=1","_self");
						}
					}
				}
				else if(direction == 'forward' && $scope.currentIndex != $scope.slides.length-1){
					$scope.currentIndex += 1;
					
					if($scope.cardID != 1 && $scope.cardID != 2 && $scope.cardID != 3){
						var fontTimer = $timeout(function(){
							resizeFont();
							$timeout.cancel(fontTimer);
						},100);
					}
					
					setAnimation();
				}
				else if(direction == 'backward' && $scope.currentIndex == 0){
					$scope.autoPlay = false;
					$interval.cancel($scope.slideInterval);
					
					if($scope.playAll == 1){
						var topicID = $scope.topicID - 1;
						
						if(topicID >= $scope.firstIndex){
							$window.open("flashCardSlides.html?cardID="+$scope.cardID+"&topicID="+topicID+"&firstIndex="+$scope.firstIndex+"&lastIndex="+$scope.lastIndex+"&playAll=1","_self");
						}
					}
				}
				else if(direction == 'backward' && $scope.currentIndex != 0){
					$scope.currentIndex -= 1;
					
					if($scope.cardID != 1 && $scope.cardID != 2 && $scope.cardID != 3){
						var fontTimer = $timeout(function(){
							resizeFont();
							$timeout.cancel(fontTimer);
						},100);
					}
					
					setAnimation();
					
				}
				
			},2000/speed);
		}
		else{
			$interval.cancel($scope.slideInterval);
		}
	}
	
	$scope.audioPlayed = false;
	$scope.playAudio = function(param){
		
		if(!$scope.audioPlayed){
			var audio = new Audio('../audio/'+param.AudioSource);
			audio.currentTime = param.TimeFrame._Start / 1000; //-- the data is in millisecond, change to second
			audio.playbackRate = 1*speed;

			audio.play();
			$scope.audioPlayed = true;
			
			var audioTimer = $interval(function(){
				if(audio.currentTime >= param.TimeFrame._End / 1000){
					audio.pause();
					$scope.audioPlayed = false;
					$interval.cancel(audioTimer);
				}
			},10);
		}
	}
	
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
	
	//-- get paramter from URL
	function getURLParameter(name) {
	  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	
	$scope.decreaseIndex = function(){
		
		if($scope.currentIndex != 0){
			$scope.currentIndex -= 1;
			
			var fontTimer = $timeout(function(){
				resizeFont();
				$timeout.cancel(fontTimer);
			},100);
		
			setAnimation();
		}
		
	}
	$scope.increaseIndex = function(){
		$scope.currentIndex += 1;
		
		var fontTimer = $timeout(function(){
			resizeFont();
			$timeout.cancel(fontTimer);
		},100);
					
		setAnimation();
	}
	
	function resizeFont(){

		if($scope.cardID == 4 || $scope.cardID == 5 || $scope.cardID == 6){
			var div = document.getElementById('ChineseDiv');
			div.style.fontSize = "1500%";
		}
		else if($scope.cardID == 7 || $scope.cardID == 8 || $scope.cardID == 9){
			var div = document.getElementById('MalayDiv');
			div.style.fontSize = "1500%";
		}
		else if($scope.cardID == 10 || $scope.cardID == 11 || $scope.cardID == 12){
			var div = document.getElementById('EnglishDiv');
			div.style.fontSize = "1500%";
		}
		
		//alert(div.clientWidth);
		//alert(div.scrollWidth);
		
		if (0 > div.clientWidth - div.scrollWidth) {
		
			//alert("Overflow");
			
			var fontSizeInPx =  getComputedStyle(div).getPropertyValue('font-size');
			var fontSize = parseInt(fontSizeInPx.replace("px", ""));
			
			while(0 > div.clientWidth - div.scrollWidth){
				fontSize -= 2.5;
				div.style.fontSize = fontSize.toString() + 'px';
			}

		}
		
		//resizeImage();
		
	}
	function resizeImage(){
		
		if($scope.cardID == 4 || $scope.cardID == 5 || $scope.cardID == 6){
			var img = document.getElementById('chineseImage');
		}
		else if($scope.cardID == 7 || $scope.cardID == 8 || $scope.cardID == 9){
			var img = document.getElementById('malayImage');
		}
		else if($scope.cardID == 10 || $scope.cardID == 11 || $scope.cardID == 12){
			var img = document.getElementById('englishImage');
		}
		
		var width = img.clientWidth;
		var height = img.clientHeight;
		
		if(width > height){
			img.style.width = "100%";
			img.style.height = "auto";
		}
		else{
			var heightInPx = document.getElementById('flashCardSlides').style.height;
			var cardHeight = parseInt(heightInPx.replace("px", ""));
			//alert(heightInPx);
			img.style.width = "auto";
			img.style.height = (cardHeight * 0.8).toString() + "px";
		}
		
	}
	
	function noImage(){
		if($scope.cardID == 4 || $scope.cardID == 5 || $scope.cardID == 6){
			var img = document.getElementById('chineseImage');
		}
		else if($scope.cardID == 7 || $scope.cardID == 8 || $scope.cardID == 9){
			var img = document.getElementById('malayImage');
		}
		else if($scope.cardID == 10 || $scope.cardID == 11 || $scope.cardID == 12){
			var img = document.getElementById('englishImage');
			var img = document.getElementById('englishImage');
		}
		
		img.src = "../img/no_image.jpg";
	}
	
	if(getURLParameter('cardID') != null && getURLParameter('topicID') != null){
		
		//-- conver string to int
		$scope.cardID = parseInt(getURLParameter('cardID'), 10);
		$scope.topicID = parseInt(getURLParameter('topicID'), 10);
		$scope.firstIndex = parseInt(getURLParameter('firstIndex'), 10);
		$scope.lastIndex = parseInt(getURLParameter('lastIndex'), 10);
		$scope.playAll = parseInt(getURLParameter('playAll'), 10);
		
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
			$scope.autoPlay = false;
			
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
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
		
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 数字成语 第二册 ----------------------------------------
		if($scope.cardID == 2){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
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
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 速读成语 ----------------------------------------
		if($scope.cardID == 3){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
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
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					$scope.$apply();
					
				}
			});
		}

		//---------------------------------------- 华语 第一册 ----------------------------------------
		if($scope.cardID == 4){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
			$.ajax({
				url: "Chinese.json",
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
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					var fontTimer = $timeout(function(){
						resizeFont();
						$timeout.cancel(fontTimer);
					},100);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 华语 第二册 ----------------------------------------
		if($scope.cardID == 5){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
			$.ajax({
				url: "Chinese.json",
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
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					var fontTimer = $timeout(function(){
						resizeFont();
						$timeout.cancel(fontTimer);
					},100);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 华语 第三册 ----------------------------------------
		if($scope.cardID == 6){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
			$.ajax({
				url: "Chinese.json",
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
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					var fontTimer = $timeout(function(){
						resizeFont();
						$timeout.cancel(fontTimer);
					},100);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- Bahasa Malaysia (A-B) ----------------------------------------
		if($scope.cardID == 7){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
			$.ajax({
				url: "Malay.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							
							angular.forEach($scope.slides, function(obj){
								
								var word = obj.Text.split('@');
								obj.customTextArray = word;
							});
							
							break;
						}
					}
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					var fontTimer = $timeout(function(){
						resizeFont();
						$timeout.cancel(fontTimer);
					},100);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- Bahasa Malaysia (C-D) ----------------------------------------
		if($scope.cardID == 8){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
			$.ajax({
				url: "Malay.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							
							angular.forEach($scope.slides, function(obj){
								
								var word = obj.Text.split('@');
								obj.customTextArray = word;
							});
							
							break;
						}
					}
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					var fontTimer = $timeout(function(){
						resizeFont();
						$timeout.cancel(fontTimer);
					},100);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- Bahasa Malaysia (E-F) ----------------------------------------
		if($scope.cardID == 9){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
			$.ajax({
				url: "Malay.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					for(var i=0; i<data.root.Topic.length; i++){
						if($scope.topicID == data.root.Topic[i]._Index){
							$scope.slides = data.root.Topic[i].Slide;
							$scope.topicTitle = data.root.Topic[i]._Title;
							
							angular.forEach($scope.slides, function(obj){
								
								var word = obj.Text.split('@');
								obj.customTextArray = word;
							});
							
							break;
						}
					}
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					var fontTimer = $timeout(function(){
						resizeFont();
						$timeout.cancel(fontTimer);
					},100);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- English (A-B) ----------------------------------------
		if($scope.cardID == 10){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
			$.ajax({
				url: "English.json",
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
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
						$timeout.cancel(timer);
						},1500);
					}
					
					var fontTimer = $timeout(function(){
						resizeFont();
						$timeout.cancel(fontTimer);
					}, 100);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- English (C-D) ----------------------------------------
		if($scope.cardID == 11){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
			$.ajax({
				url: "English.json",
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
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					var fontTimer = $timeout(function(){
						resizeFont();
						$timeout.cancel(fontTimer);
					},100);
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- English (E-F) ----------------------------------------
		if($scope.cardID == 12){
			
			$scope.slides = [];
			$scope.currentIndex = 0;
			$scope.autoPlay = false;
			
			$.ajax({
				url: "English.json",
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
					
					if(parseInt(getURLParameter('playAll'), 10) == 1){
						$scope.autoPlay = true;
						var timer = $timeout(function(){
							$scope.autoPlaySlide(true,'forward');
							$timeout.cancel(timer);
						},1200);
					}
					
					var fontTimer = $timeout(function(){
						resizeFont();
						$timeout.cancel(fontTimer);
					},100);
					
					$scope.$apply();
					
				}
			});
		}
		
	}
	
});

app.directive('fallbackSrc', function () {
	var fallbackSrc = {
		link: function postLink(scope, iElement, iAttrs) {
			iElement.bind('error', function() {
				angular.element(this).attr("src", iAttrs.fallbackSrc);
			});
		}
	}
   return fallbackSrc;
});