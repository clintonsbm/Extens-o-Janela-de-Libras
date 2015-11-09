var meuVetorLinks = new Array('https://www.youtube.com/watch?v=asMaEu3-hf4',
                              'https://www.youtube.com/watch?v=IQXmrz5FB7E', 
                              'https://www.youtube.com/watch?v=eSvDP_C5z0A',
                              'https://www.youtube.com/watch?v=TxCnLlgJOYg');
                              
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Recebendo mensagem");
    if(request.buttonClicked == "true"){
        request.buttonClicked = "false";
        console.log("Devia criar notificação por causa do clique");
        noticationCheckURL();
    }
})

function noticationCheckURL(){
    var url = window.location.href;
    //URL da página atual
    //console.log(url);
    for (var i = 0; i < meuVetorLinks.length; i++) {
        if (url == meuVetorLinks[i]) {
           chrome.runtime.sendMessage({notification: "true"});
            //i = meuVetorLinks.length;
        }
    }
}
noticationCheckURL();