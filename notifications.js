var meuVetorLinks = new Array('https://www.youtube.com/watch?v=asMaEu3-hf4',
                              'https://www.youtube.com/watch?v=IQXmrz5FB7E', 
                              'https://www.youtube.com/watch?v=eSvDP_C5z0A',
                              'https://www.youtube.com/watch?v=KGZ5xhyOZg0');

function noticationCheckURL(){
    var url = window.location.href;
    //URL da página atual
    //console.log(url);
    for (var i = 0; i < meuVetorLinks.length; i++) {
        if (url == meuVetorLinks[i]) {
            window.postMessage({notification: "true"}, "*");
            i = meuVetorLinks.length;
        }
    }
}

function callBack(){
    
}

noticationCheckURL();