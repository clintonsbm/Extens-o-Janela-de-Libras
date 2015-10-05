window.addEventListener('message', function(event) {
  //Only accept messages from same frame
  if (event.source !== window) {
    console.log("deu erro 1");
    return;
  }

  var message = event.data;

  //Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null) {
    console.log("deu erro 2");
    return;
  }
  console.log("não deu erro");
  chrome.runtime.sendMessage("ilnofnedaekliinfocjnfkjmgkbkakne", message);
});


// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("Recebeu algo"); 
// })

