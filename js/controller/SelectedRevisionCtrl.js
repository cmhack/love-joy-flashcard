app.controller('SelectedRevisionCtrl', function($scope){
	
	document.getElementById("backgroundImage").style.height = window.innerHeight + "px";
	
	$scope.soundON = true;
	
	var audio = new Audio('../audio/Fast Track.mp3');
	audio.play();
	
	$scope.playAudio = function(param){
		
		if(param){
			audio.play();
		}
		else{
			audio.pause();
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
	
	if(getURLParameter('cardID') != null){
		
		//-- conver string to int
		$scope.cardID = parseInt(getURLParameter('cardID'), 10);
		
		if( ($scope.cardID == 1) || ($scope.cardID == 2) || ($scope.cardID == 3)){
			document.getElementById("backgroundImage").style.background = "url('../img/background/Idiom.jpg')no-repeat center center fixed";
			document.getElementById("backgroundImage").style.backgroundSize = "cover";
		}
		else if( ($scope.cardID == 4) || ($scope.cardID == 5) || ($scope.cardID == 6)){
			document.getElementById("backgroundImage").style.background = "url('../img/background/Chinese.jpg')no-repeat center center fixed";
			document.getElementById("backgroundImage").style.backgroundSize = "cover";
		}
		else if( ($scope.cardID == 7) || ($scope.cardID == 8) || ($scope.cardID == 9)){
			document.getElementById("backgroundImage").style.background = "url('../img/background/Malay.jpg')no-repeat center center fixed";
			document.getElementById("backgroundImage").style.backgroundSize = "cover";
		}
		else if( ($scope.cardID == 10) || ($scope.cardID == 11) || ($scope.cardID == 12)){
			document.getElementById("backgroundImage").style.background = "url('../img/background/English.jpg')no-repeat center center fixed";
			document.getElementById("backgroundImage").style.backgroundSize = "cover";
		}
		
		for(var i=0; i<menuList.length; i++){
			if(getURLParameter('cardID') == menuList[i].id){
				$scope.title = menuList[i].title;
				break;
			}
		}
		
		//---------------------------------------- 数字成语 第一册 ----------------------------------------
		if($scope.cardID == 1){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "idioms.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//-- store 10 items into list 1
					for(var i=0; i<10; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					
					//-- store 10 items into list 2
					for(var i=10; i<20; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 数字成语 第二册 ----------------------------------------
		if($scope.cardID == 2){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "idioms.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//-- store 10 items into list 1
					for(var i=20; i<30; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					
					//-- store 10 items into list 2
					for(var i=30; i<40; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 速读成语 ----------------------------------------
		if($scope.cardID == 3){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "idioms.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//-- store 10 items into list 1
					for(var i=40; i<50; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					
					//-- store 10 items into list 2
					for(var i=50; i<data.root.Topic.length; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}

		//---------------------------------------- 华语 第一册 ----------------------------------------
		if($scope.cardID == 4){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "ChineseActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//-- store 10 items into list 1
					for(var i=0; i<9; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					
					//-- store 10 items into list 2
					for(var i=9; i<18; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 华语 第二册 ----------------------------------------
		if($scope.cardID == 5){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "ChineseActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//-- store 10 items into list 1
					for(var i=18; i<29; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					
					//-- store 10 items into list 2
					for(var i=29; i<39; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- 华语 第三册 ----------------------------------------
		if($scope.cardID == 6){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "ChineseActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
				//	var num = ((data.root.Topic.length - 40) / 2) + 40;
					
					//-- store 10 items into list 1
					for(var i=39; i<49; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					//-- store 10 items into list 1
				//-- store 10 items into list 2
					for(var i=49; i<58; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- Bahasa Malaysia (A-B) ----------------------------------------
		if($scope.cardID == 7){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "MalayActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//-- store 10 items into list 1
					for(var i=0; i<8; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					
					//-- store 10 items into list 2
					for(var i=8; i<16; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- Bahasa Malaysia (C-D) ----------------------------------------
		if($scope.cardID == 8){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "MalayActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//-- store 10 items into list 1
					for(var i=16; i<24; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					
					//-- store 10 items into list 2
					for(var i=24; i<32; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- Bahasa Malaysia (E-F) ----------------------------------------
		if($scope.cardID == 9){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "MalayActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					var num = ((data.root.Topic.length - 40) / 2) + 40;
					
					//-- store 10 items into list 1
					for(var i=32; i<40; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					//-- store 10 items into list 2
					for(var i=40; i<48; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- English (A-B) ----------------------------------------
		if($scope.cardID == 10){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "EnglishActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//-- store 10 items into list 1
					for(var i=0; i<8; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					//-- store 10 items into list 2
					for(var i=8; i<16; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- English (C-D) ----------------------------------------
		if($scope.cardID == 11){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "EnglishActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//-- store 10 items into list 1
					for(var i=16; i<24; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					//-- store 10 items into list 2
					for(var i=24; i<32; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
		//---------------------------------------- English (E-F) ----------------------------------------
		if($scope.cardID == 12){
			
			$scope.list1 = [];
			$scope.list2 = [];
			
			$.ajax({
				url: "EnglishActivity.json",
				beforeSend: function(xhr){xhr.overrideMimeType("application/json");},
				dataType: "json",
				success: function(data){
					console.log(data);
					
					//var num = ((data.root.Topic.length - 40) / 2) + 40;
					
					//-- store 10 items into list 1
					for(var i=32; i<40; i++){
						$scope.list1.push(data.root.Topic[i]);
					}
					//-- store 10 items into list 1
						for(var i=40; i<48; i++){
						$scope.list2.push(data.root.Topic[i]);
					}
					
					$scope.$apply();
					
				}
			});
		}
		
	}
	
});