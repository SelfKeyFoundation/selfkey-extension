'use strict'

var LWS_CONTENT_SCRIPT_NAME = "LWS_INIT";

function lwsClientInit(data){
    window.lws = {data: data};
}

function injectInitial(data){
    if (window.lwsInjectComplete) return;

    var code = ''
    +'\n(function(data){'
    +'\n'+lwsClientInit.toString()
    +'\lwsClientInit(data);'
    +'\n})('+JSON.stringify(data)+');';

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.textContent = code;
    (document.head||document.documentElement).prepend(s);
    s.remove();
    window.lwsInjectComplete = true;
}

function generateHash(){
    // TODO: make it crypto - secure
    return Math.random();
}

function initListeners(){
    window.bgPort = chrome.runtime.connect({name: LWS_CONTENT_SCRIPT_NAME});
    window.bgPort.addEventListener('message', handleBgMessage);
    window.addEventListener('message', handleWebPageMessage, false);
}

function handleWebPageMessage(evt){
    if (!evt.data && !evt.data.type && evt.data.hash == window.hash) return;
    switch (evt.data.type){
        case 'init' : return sendInitToBg(evt.data);
    }
}

function handleBgMessage(msg){
    if (!evt.response) return;
    switch(evt.response){
        case 'init': return handleInitFromBg(msg);
    }
}

function sendInitToBg(data) {
    if (data.config){
        console.error('No config provided');
        return;
    }
    window.bgPort.postMessage({
        request: 'init', 
        config: data.config
    });
}

function handleInitFromBg(msg){
    console.log('connected: true');
}

function main(){
    var hash = generateHash();
    window.hash = hash;
    initListeners();
    var data = {
        clientUrl: chrome.runtime.getUrl('lws-inject.js'),
        clientTagId: 'lws-js-sdk',
        iframeUrl: chrome.runtime.getUrl('main.html'),
        originHash: hash,
        id: chrome.runtime.id
    };
    injectInitial(data);
}

main();