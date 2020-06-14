app.controller('FlashCardCtrl', function($scope, $http){
	
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
	
	
	$scope.menuList1 = [
		{title: "数字成语 第一册", id:"1"},
		{title: "数字成语 第二册", id:"2"},
		{title: "速读成语", id:"3"}];
	
	$scope.menuList2 = [
		{title: "华语 第一册", id:"4"},
		{title: "华语 第二册", id:"5"},
		{title: "华语 第三册", id:"6"}];
		
	$scope.menuList3 = [
		{title: "Bahasa Malaysia (A-B)", id:"7"},
		{title: "Bahasa Malaysia (C-D)", id:"8"},
		{title: "Bahasa Malaysia (E-F)", id:"9"}];
	
	$scope.menuList4 = [
		{title: "English (A-B)", id:"10"},
		{title: "English (C-D)", id:"11"},
		{title: "English (E-F)", id:"12"}];

});
