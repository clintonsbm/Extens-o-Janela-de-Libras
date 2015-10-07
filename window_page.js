function testResize(){
	console.log("viu o resize");
	var yourCustomJavaScriptCode = 'var w = window.innerWidth; var h = window.innerHeight; var player = document.getElementById("player"); player.width = w-10; player.height = h-10;';

  	var script = document.createElement('script');
  	var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
  	script.appendChild(code);
  	(document.body || document.head).appendChild(script);
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('recebendo mensagem de script injetado');
//   
//   id = request.idTab;
//   console.log(id);
//   if (tempoAntigo !== request.currentTime) {
//     // console.log(request);
//     // console.log(request.currentTime);
//     // console.log(tempoAntigo);
//     var tempoAntigo = request.currentTime;
//     player.seekTo(tempoAntigo);
//   } else {
//     console.log('mensagem recebida sem utilidade');
//   }
//   console.log(request.state);
//   // if(request.state == "paused"){
//   //   console.log("Devia ter pausado");
//   //   player.pauseVideo();
//   // }
//   // else{
//   //   if(request.state == "playing"){
//   //     console.log("Devia ter continuado");
//   //     player.playVideo(); 
//   //   }
//   // }
//   return true;
// })


// function onPlayerStateChange() {
//   window.postMessage({ currentTimePop: player.getCurrentTime() }, "*");
//   var state = player.getPlayerState();
//   if (state == 1) {
//     console.log("playing");
//     window.postMessage({ statePop: "playing" }, "*");
//   }
//   else {
//     if (state == 2) {
//       console.log("paused");
//       window.postMessage({ statePop: "paused" }, "*");
//     }
//   }
//   console.log("Teoricamente mandou a mensagem");
// }


//Sending a message to the injected script (have to check how it's done)

// function onPlayerStateChange() {
//   var port = chrome.runtime.tabs.connect(id,{name: "Pop"});
//   port.postMessage({currentTimePop: player.geCurrentTime() });
//   //chrome.runtime.postMessage("eajldeackpegkojaeanplpjanlkdjjnh",{ currentTimePop: player.getCurrentTime() });
//   var statePop = player.getPlayerState();
//   if (statePop == 1) {
//     console.log("playing");
//     port.postMessage({statePop: "playing"});
//     //chrome.runtime.postMessage("eajldeackpegkojaeanplpjanlkdjjnh",{ statePop: "playing" });
//   }
//   else {
//     if (statePop == 2) {
//       console.log("paused");
//       port.postMessage({statePop: "paused"});
//       //chrome.runtime.postMessage("eajldeackpegkojaeanplpjanlkdjjnh",{ statePop: "paused" });
//     }
//   }
//   console.log("Teoricamente mandou a mensagem");
// }

