var opt = {
    type: "basic",
    title: "Vídeo em libras",
    message: "Este vídeo contem a versão em libras. Cliquen o ícone do app ou aqui para abri-lo",
    iconUrl: "icon.png"
};

var initialTime;

var notificationIdvar = null;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //console.log("recebendo mensagem no background");
  //console.log(request);
  if(request.notification == "true"){
    //console.log("devia ter criado a notificação");
    chrome.notifications.create("", opt, function (notificationId){ notificationIdvar = notificationId; console.log(notificationIdvar); });
  }
})

chrome.notifications.onClicked.addListener(function(){
var meuVetorLinks = new Array('https://www.youtube.com/watch?v=asMaEu3-hf4',
                              'https://www.youtube.com/watch?v=IQXmrz5FB7E', 
                              'https://www.youtube.com/watch?v=eSvDP_C5z0A',
                              'https://www.youtube.com/watch?v=TxCnLlgJOYg');
                                  
var meuVetorIframes = new Array('asMaEu3-hf4',
                                'IQXmrz5FB7E',
                                'eSvDP_C5z0A',
                                '9pG7MTyUbxY');

var tabId;
var urlFromCurrentPage;

chrome.tabs.query({
    active: true,               
    lastFocusedWindow: true     
}, function(array_of_Tabs) {
        var tab = array_of_Tabs[0];
        urlFromCurrentPage = tab.url;
        createPageUrl(tab.url);
        tabId = tab.id;      
});

function createPageUrl(url){
    
    var pageUrl = document.getElementById('page-url') || document.createElement("div");
    pageUrl.setAttribute("id", "page-url");
    
    createWindow(url);
    
    document.body.appendChild(pageUrl);
}

var myWindow;

function createWindow(url){
    for(var i = 0; i < meuVetorLinks.length; i++){
        if(url == meuVetorLinks[i]) {
            myWindow = window.open('window_page.html', '', 'width=415, height=266, resizable=0');
            myWindow.moveTo(890, 155);
            myWindow.document.write('<html><head><title>Vídeo em libras</title></head><body onresize="testResize()"></body></html>');
            myWindow.document.write('<script src="window_page.js"></script>');
            myWindow.document.write('<div id="player"></div>');
            myWindow.document.write(''+
                                    '<script>'+
                                    'var tag = document.createElement("script");'+

                                    'tag.src = "https://www.youtube.com/iframe_api";'+
                                    'var firstScriptTag = document.getElementsByTagName("script")[0];'+
                                    'firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);'+

                                    // 3. This function creates an <iframe> (and YouTube player)
                                    //    after the API code downloads.
                                    'var player;'+
                                    'function onYouTubeIframeAPIReady() {'+
                                        'player = new YT.Player("player", {'+
                                            'height: "216",'+
                                            'width: "385",'+
                                            'videoId: '+"'"+meuVetorIframes[i]+"'"+','+
                                            'events: {'+
                                                '"onReady": onPlayerReady,'+
                                                '"onStateChange": onPlayerStateChange'+
                                            '}'+
                                        '});'+
                                    '}'+
                                    
                                    'function onPlayerReady(event) {'+
                                        //'event.target.playVideo();'+                                      
                                        'event.target.pauseVideo();'+
                                        //'event.target.seekTo('+initialTime+');'+
                                        'event.target.playVideo();'+
                                    '}'+
                                  
                                  'function onPlayerStateChange() { ' +
		                              'var statePop = player.getPlayerState();'+
		                              'if(statePop == 1){'+
			                             //'console.log("playing");'+		                             
                                   'chrome.runtime.sendMessage({statePop: "playing", time: player.getCurrentTime()});'+
		                              '}'+
		                              'else{'+
			                             'if(statePop == 2){'+
				                            //'console.log("paused");'+
                                    'chrome.runtime.sendMessage({statePop: "paused", time: player.getCurrentTime()});'+
			                             '}'+
		                              '}'+
		                              //'console.log("Teoricamente mandou a mensagem");' +
	                               '}'+
                                 'chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {'+
                                   'if(request.state == "paused"){'+
                                     //'console.log("Devia ter pausado");'+
                                     'player.pauseVideo();'+
                                     //'player.seekTo(request.currentTime);'+
                                     'request.state = null;'+
                                   '}'+
                                   'else {'+
                                    'if(request.state == "playing"){'+
                                      //'console.log("Devia ter continuado");'+
                                      //'player.seekTo(request.currentTime);'+
                                      'player.playVideo();'+
                                      'request.state = null;'+
                                    '}'+            
                                   '}'+
                                 '})'+
                                    
                                    '</script>')
            
         }
    }
}
})


    



// while(true){
//   if(typeof not !== 'undefined'){
//     chrome.notifications.OnClicked.addListener(function(){console.log("notificação clicada")})
//   }
//   else{
//     false;
//   }
// }

var tabId;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
  if(request.initialTimeForIframe){
    initialTime = request.initialTimeForIframe;
  }
  if(request.currentWindow == "true"){
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (array_of_Tabs) {
      var tab = array_of_Tabs[0];
      tabId = tab.id;
      console.log(tabId);     
    })
  }
  if(request.statePop == "playing"){
    //console.log("mandou mensagem de playing");
    //chrome.runtime.sendMessage("ilnofnedaekliinfocjnfkjmgkbkakne", {statePop: "playing"})
    request.statePop = "null";
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //console.log("Enviou mensagem do background para o script")
        chrome.tabs.sendMessage(tabId, { statePop: "playing", time: request.time });
     });
  }
  else{
    if(request.statePop == "paused"){
      //console.log("mandou mensagem de paused");
      //chrome.runtime.sendMessage("ilnofnedaekliinfocjnfkjmgkbkakne", {statePop: "paused"});
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //console.log("Enviou mensagem do background para o script")
        chrome.tabs.sendMessage(tabId, { statePop: "paused", time: request.time });
      });
      request.statePop = "null";
    }
  }
})