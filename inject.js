var yourCustomJavaScriptCode = '' +
	'var ytplayer = document.getElementById("movie_player"); ' +
	'ytplayer.pauseVideo();'+
  'window.postMessage({initialTimeForIframe: ytplayer.getCurrentTime()}, "*");' +
	'ytplayer.addEventListener("onStateChange", function() { ' +
		'window.postMessage({currentTime: ytplayer.getCurrentTime()}, "*");' +
		'var state = ytplayer.getPlayerState();'+
		'if(state == 1){'+
			//'console.log("playing");'+
			'window.postMessage({state: "playing"}, "*");'+
		'}'+
		'else{'+
			'if(state == 2){'+
				//'console.log("paused");'+
				'window.postMessage({state: "paused"}, "*");'+
			'}'+
		'}'+
		//'console.log("Teoricamente mandou a mensagem");' +
	'});';

var script = document.createElement('script');
var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
script.appendChild(code);
(document.body || document.head).appendChild(script);

function injectPlay(time){
  var yourCustomJavaScriptCode = 'var ytplayer = document.getElementById("movie_player"); ytplayer.seekTo('+time+'); ytplayer.playVideo();';

  var script = document.createElement('script');
  var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
  script.appendChild(code);
  (document.body || document.head).appendChild(script);
}

function injectPause(time){
  var yourCustomJavaScriptCode = 'var ytplayer = document.getElementById("movie_player"); ytplayer.seekTo('+time+'); ytplayer.pauseVideo();';

  var script = document.createElement('script');
  var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
  script.appendChild(code);
  (document.body || document.head).appendChild(script);
}

function injectTime(time){
  var yourCustomJavaScriptCode = 'var ytplayer = document.getElementById("movie_player"); ytplayer.seekTo('+time+');';

  var script = document.createElement('script');
  var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
  script.appendChild(code);
  (document.body || document.head).appendChild(script);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //console.log('recebendo mensagem de script injetado');

  injectTime(request.time);
  
  if(request.statePop == "paused"){
    //console.log("Devia ter pausado");
    injectPause(request.time);
  }
  else{
    if(request.statePop == "playing"){
      //console.log("Devia ter continuado");
      injectPlay(request.time); 
    }
  }
  return true;
})