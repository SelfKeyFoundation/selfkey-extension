'use strict'

document.getElementById('lws_default').style.display = "none"
document.getElementById('lws_wrapper').style.display = "block"
document.getElementById('lws_iframe').style.display = "block"

var port = chrome.runtime.connect({name: 'LWS_INIT'})
var config = document.getElementById('lwsConfig').innerHTML
port.postMessage({
	request: 'init', 
	config: config
})

port.onMessage.addListener(msg => {
	if (msg.response === 'pong') {
		console.log('connected: true')
	} else {
		console.log('connected: false')
	}
})
