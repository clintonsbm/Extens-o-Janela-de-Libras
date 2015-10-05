var yourCustomJavaScriptCode = '' +
	'var ytplayer = document.getElementById("movie_player"); ' +
	'ytplayer.pauseVideo();';
	// 'ytplayer.addEventListener("onStateChange", function() { ' +
	// 	'window.postMessage({currentTime: ytplayer.getCurrentTime()}, "*");' +
	// 	'var state = ytplayer.getPlayerState();'+
	// 	'if(state == 1){'+
	// 		'console.log("playing");'+
	// 		'window.postMessage({state: "playing"}, "*");'+
	// 	'}'+
	// 	'else{'+
	// 		'if(state == 2){'+
	// 			'console.log("paused");'+
	// 			'window.postMessage({state: "paused"}, "*");'+
	// 		'}'+
	// 	'}'+
	// 	'console.log("Teoricamente mandou a mensagem");' +
	// '});'+
// 	'console.log("chegou aqui no inject.js");'+
// 	'chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {'+
// 		'console.log("recebendo mensagem do backcground");'+
// 
// 		'if(tempoAntigoPop !== request.currentTimePop) {'+
// 			// console.log(request);
// 			// console.log(request.currentTime);
// 			// console.log(tempoAntigo);
// 			'var tempoAntigoPop = request.currentTimePop;'+
// 			'ytplayer.seekTo(tempoAntigoPop);'+
// 		'}'+
// 		'else{'+
// 			'console.log("mensagem recebida sem utilidade");'+
// 		'}'+
// 
// 		'if(request.statePop == "paused"){'+
// 			'console.log("Devia ter pausado");'+
// 			'ytplayer.pauseVideo();'+
// 		'}'+
// 		'else{'+
// 			'console.log("Devia ter continuado");'+
// 			'ytplayer.playVideo();'+
// 		'}'+
// 	'})';

var script = document.createElement('script');
var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
script.appendChild(code);
(document.body || document.head).appendChild(script);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('recebendo mensagem de script injetado');

  if (tempoAntigoPop !== requestPop.currentTime) {
    // console.log(request);
    // console.log(request.currentTime);
    // console.log(tempoAntigo);
    var tempoAntigoPop = request.currentTimePop;
    ytplayer.seekTo(tempoAntigo);
  } else {
    console.log('mensagem recebida sem utilidade');
  }
  console.log(request.statePop);
  if(request.statePop == "paused"){
    console.log("Devia ter pausado");
    ytplayer.pauseVideo(); 
  }
  else{
    console.log("Devia ter continuado");
    ytplayer.playVideo();  
  }
  return true;
})