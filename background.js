var opt = {
    type: "basic",
    title: "Vídeo em libras",
    message: "Este vídeo contem a versão em libras. Cliquen o ícone do app ou aqui para abri-lo",
    iconUrl: "icon.png"
};

// chrome.notifications.onButtonClicked.addListener("0", function answerClick(){
//       //window.postMessage({notificationClicked: "true"}, "*");
//     })
//var not = undefined;
var notificationIdvar = null;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("recebendo mensagem no background");
  console.log(request);
  if(request.notification == "true"){
    console.log("devia ter criado a notificação");
    not = chrome.notifications.create("", opt, function (notificationId){ notificationIdvar = notificationId; console.log(notificationIdvar); });
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
  


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
  if(request.statePop == "playing"){
    console.log("mandou mensagem de playing");
    //chrome.runtime.sendMessage("ilnofnedaekliinfocjnfkjmgkbkakne", {statePop: "playing"})
    request.statePop = "null";
     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("Enviou mensagem do background para o script")
        chrome.tabs.sendMessage(tabs[0].id, { statePop: "playing" });
     });
  }
  else{
    if(request.statePop == "paused"){
      console.log("mandou mensagem de paused");
      //chrome.runtime.sendMessage("ilnofnedaekliinfocjnfkjmgkbkakne", {statePop: "paused"});
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("Enviou mensagem do background para o script")
        chrome.tabs.sendMessage(tabs[0].id, { statePop: "paused" });
      });
      request.statePop = "null";
    }
  }
})