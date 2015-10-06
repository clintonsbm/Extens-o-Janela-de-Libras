// /// <reference path="chrome.d.ts" />
// var meuVetorLinks = new Array('https://www.youtube.com/watch?v=asMaEu3-hf4',
//                               'https://www.youtube.com/watch?v=IQXmrz5FB7E', 
//                               'https://www.youtube.com/watch?v=eSvDP_C5z0A',
//                               'https://www.youtube.com/watch?v=KGZ5xhyOZg0');
//                                   
// var meuVetorIframes = new Array('asMaEu3-hf4',
//                                 'IQXmrz5FB7E',
//                                 'eSvDP_C5z0A',
//                                 'sDeFhdkfCxk');
// 
// var tabId;
// var urlFromCurrentPage;
// 
// chrome.tabs.query({
//     active: true,               
//     lastFocusedWindow: true     
// }, function(array_of_Tabs) {
//         var tab = array_of_Tabs[0];
//         urlFromCurrentPage = tab.url;
//         createPageUrl(tab.url);
//         tabId = tab.id;      
// });
// 
// setTimeout(function(){
//     console.log(tabId);
// }, 200);
// 
// 
// 
// function createPageUrl(url){
//     
//     var pageUrl = document.getElementById('page-url') || document.createElement("div");
//     pageUrl.setAttribute("id", "page-url");
//     
//     createWindow(url);
//     
//     document.body.appendChild(pageUrl);
// }
// 
// var myWindow;
// 
// function createWindow(url){
//     for(var i = 0; i < meuVetorLinks.length; i++){
//         if(url == meuVetorLinks[i]) {
//             myWindow = window.open('window_page.html', '', 'width=675, height=450, resizable=0');
//             myWindow.document.write('<script src="window_page.js"></script>');
//             myWindow.document.write('<div id="player"></div>');
//             myWindow.document.write(''+
//                                     '<script>'+
//                                     'var tag = document.createElement("script");'+
// 
//                                     'tag.src = "https://www.youtube.com/iframe_api";'+
//                                     'var firstScriptTag = document.getElementsByTagName("script")[0];'+
//                                     'firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);'+
// 
//                                     // 3. This function creates an <iframe> (and YouTube player)
//                                     //    after the API code downloads.
//                                     'var player;'+
//                                     'function onYouTubeIframeAPIReady() {'+
//                                         'player = new YT.Player("player", {'+
//                                             'height: "390",'+
//                                             'width: "640",'+
//                                             'videoId: '+"'"+meuVetorIframes[i]+"'"+','+
//                                             'events: {'+
//                                                 '"onReady": onPlayerReady,'+
//                                                 '"onStateChange": onPlayerStateChange'+
//                                             '}'+
//                                         '});'+
//                                     '}'+
//       
//                                     'function onPlayerReady(event) {'+
//                                         'event.target.playVideo();'+
//                                         'event.target.pauseVideo();'+
//                                     '}'+
//                                     'function onPlayerStateChange() { ' +
// 		                              //'window.postMessage({currentTimePop: player.getCurrentTime()}, "*");' +
// 		                              'var statePop = player.getPlayerState();'+
// 		                              'if(statePop == 1){'+
// 			                             'console.log("playing");'+
// 			                             //'window.postMessage({statePop: "playing"}, "*");'+
//                                          'chrome.runtime.sendMessage({statePop: "playing", time: player.getCurrentTime()});'+
// 		                              '}'+
// 		                              'else{'+
// 			                             'if(statePop == 2){'+
// 				                            'console.log("paused");'+
// 				                            //'window.postMessage({statePop: "paused"}, "*");'+
//                                             'chrome.runtime.sendMessage({statePop: "paused", time: player.getCurrentTime()});'+
// 			                             '}'+
// 		                              '}'+
// 		                              'console.log("Teoricamente mandou a mensagem");' +
// 	                               '}'+
//                                     
//                                     '</script>')
//             //myWindow.document.write('<iframe id="ytplayerPop" type="text/html" width="640" height="390" autoplay="1" src="http://www.youtube.com/embed/'+ meuVetorIframes[i] +'?version=3&enablejsapi=1&autoplay=1" frameborder="0"/>');
//             
//          }
//         else{
//             console.log('link nao esta presente no vetor');
//             console.log(url);
//             console.log(meuVetorLinks[i]);
//         }
//     }
// }