'use strict'

// WEBSOCKET MESSAGE OBJECT FORMAT EXAMPLE
//
// {
// 	"i" : "wallet", (OPTIONS: wallet, wallets, info, password, signature)
// 	"pubKey":"0x1234abcd",
// 	"password":1234,
// 	"nonce":"123412341234"
// }

// Open up an ongoing connection for message passing
chrome.runtime.onConnect.addListener(port => {
	// set the port name LWS_INIT
	console.assert(port.name == 'LWS_INIT')
	// create a websocket connection with the IDW
	const ws = new WebSocket('ws://localhost:8898')
	// listening for messages
	port.onMessage.addListener(msg => {
		// handle error
		ws.onopen = function(event) {
			// handle error
			console.log('WS OPEN')
			
			// init
			if (msg.request == 'init') {
				
				console.log('LWS_INIT')

				const config = msg.config

				port.postMessage({
					response: 'pong'
				}) 
			
			// get wallets
			} else if (msg.request == 'wallets') {
				
				console.log('GET WALLETS')
				
				ws.send(JSON.stringify({
					"request":"wallets"
				}))
				
				ws.onmessage = event => {
					port.postMessage({
						response: 'wallets',
						wallets: (JSON.parse(event.data))
					})
				}

			// unlock keystore
			} else if (msg.request == 'unlock') {
				
				console.log('UNLOCK')

				ws.send(JSON.stringify({
					"request" : "password",
					"pubKey": msg.pubKey,
					"password": msg.password
				}))

				ws.onmessage = event => {
					port.postMessage({
						response: 'unlock'
					})
				}

			// check attributes and documents
			} else if (msg.request == 'attributes') {
				
				console.log('ATTR_REQ')
				console.log(config.attributes)

				ws.send(JSON.stringify({
					"i" : "info",
					"wid": msg.wid,
					"required": config.attributes
				}))

				ws.onmessage = event => {
					port.postMessage({
						response: 'attributes',
						user: event.data
					})
				}

			// submit authentication request
			} else if (msg.request == 'auth') {
				
				console.log('AUTH_REQ')
				console.log(config.nonce)
				
				ws.send(JSON.stringify({
					"i" : "signature",
					"nonce": config.nonce,
					"pubKey": msg.pubKey
				}))

				ws.onmessage = event => {
					port.postMessage({
						response: 'unlock'
					})
				}

			// handle errors
			} else {
				port.postMessage({
					error: 'invalid message request'
				})
			}
		}

		// handle errors
		ws.onclosed = function(event) {
			console.log('WS CLOSED')
			port.postMessage({
				error: 'websocket disconnected'
			})
		}
	})
})
