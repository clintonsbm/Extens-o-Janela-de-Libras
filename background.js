var opt = {
    type: "basic",
    title: "Vídeo em libras",
    message: "Este vídeo contem a versão em libras. Cliquen o ícone do app ou aqui para abri-lo",
    iconUrl: "icon.png"
};


//var not = undefined;
var notificationIdvar = null;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("recebendo mensagem no background");
  console.log(request);
  if(request.notification == "true"){
    console.log("devia ter criado a notificação");
    chrome.notifications.create("", opt, function (notificationId){ notificationIdvar = notificationId; console.log(notificationIdvar); });
  }
})

chrome.notifications.onClicked.addListener(function(){
var meuVetorLinks = new Array('https://www.youtube.com/watch?v=asMaEu3-hf4',
                              'https://www.youtube.com/watch?v=IQXmrz5FB7E', 
                              'https://www.youtube.com/watch?v=eSvDP_C5z0A',
                              'https://www.youtube.com/watch?v=KGZ5xhyOZg0');
                                  
var meuVetorIframes = new Array('asMaEu3-hf4',
                                'IQXmrz5FB7E',
                                'eSvDP_C5z0A',
                                'sDeFhdkfCxk');

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

chrome.notifications.onClicked.addListener(function(){
  console.log("clicou");
})

function createWindow(url){
    for(var i = 0; i < meuVetorLinks.length; i++){
        if(url == meuVetorLinks[i]) {
            myWindow = window.open('window_page.html', '', 'width=675, height=450, resizable=0');
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
                                            'height: "390",'+
                                            'width: "640",'+
                                            'videoId: '+"'"+meuVetorIframes[i]+"'"+','+
                                            'events: {'+
                                                '"onReady": onPlayerReady,'+
                                                '"onStateChange": onPlayerStateChange'+
                                            '}'+
                                        '});'+
                                    '}'+
      
                                    'function onPlayerReady(event) {'+
                                        'event.target.playVideo();'+
                                        'event.target.pauseVideo();'+
                                    '}'+
                                    'function onPlayerStateChange() { ' +
		                              //'window.postMessage({currentTimePop: player.getCurrentTime()}, "*");' +
		                              'var statePop = player.getPlayerState();'+
		                              'if(statePop == 1){'+
			                             'console.log("playing");'+
			                             //'window.postMessage({statePop: "playing"}, "*");'+
                                         'chrome.runtime.sendMessage({statePop: "playing", time: player.getCurrentTime()});'+
		                              '}'+
		                              'else{'+
			                             'if(statePop == 2){'+
				                            'console.log("paused");'+
				                            //'window.postMessage({statePop: "paused"}, "*");'+
                                            'chrome.runtime.sendMessage({statePop: "paused", time: player.getCurrentTime()});'+
			                             '}'+
		                              '}'+
		                              'console.log("Teoricamente mandou a mensagem");' +
	                               '}'+
                                    
                                    '</script>')
            //myWindow.document.write('<iframe id="ytplayerPop" type="text/html" width="640" height="390" autoplay="1" src="http://www.youtube.com/embed/'+ meuVetorIframes[i] +'?version=3&enablejsapi=1&autoplay=1" frameborder="0"/>');
            
         }
        else{
            console.log('link nao esta presente no vetor');
            console.log(url);
            console.log(meuVetorLinks[i]);
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
    console.log("mandou mensagem de playing");
    //chrome.runtime.sendMessage("ilnofnedaekliinfocjnfkjmgkbkakne", {statePop: "playing"})
    request.statePop = "null";
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("Enviou mensagem do background para o script")
        chrome.tabs.sendMessage(tabId, { statePop: "playing", time: request.time });
     });
  }
  else{
    if(request.statePop == "paused"){
      console.log("mandou mensagem de paused");
      //chrome.runtime.sendMessage("ilnofnedaekliinfocjnfkjmgkbkakne", {statePop: "paused"});
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("Enviou mensagem do background para o script")
        chrome.tabs.sendMessage(tabId, { statePop: "paused", time: request.time });
      });
      request.statePop = "null";
    }
  }
})