(async () => {
	'use strict'

	// gets the current tab domain
	async function getActive() {
		return new Promise((resolve,reject) => {
			const queryInfo = {
				active: true,
				currentWindow: true
			}
			chrome.tabs.query(queryInfo, tab => {
				if (tab[0]) {
					resolve(tab[0].url)
				} else {
					// TODO: better handling here
					resolve('http://localhost:3001')
				}
			})
		})
	}
	const activeTab = await getActive()

	// get the server API URL from the init file
	async function getAPI(activeTab) {
		return new Promise((resolve,reject) => {
			// TODO: is this ok or should the config be on the same page as the button?
			$.ajax({url: activeTab + '/selfkey/init.json'})
				.fail(e => reject(uiState('error', 'connectServer')))
				.done(api => resolve(api.api))	
		})
	}
	const serverBase = await getAPI(activeTab)

	// get the config object from the server API
	async function getConfig(serverBase) {
		return new Promise((resolve,reject) => {
			$.ajax({url: serverBase + '/selfkey/init'})
				.fail(e => reject(uiState('error', 'connectServer')))
				.done(config => resolve(config))	
		})
	}
	const config = await getConfig(serverBase)

	// Creates the Websocket connection to the IDW
	// TODO: Make this secure (wss://)
	// TODO: How to manage port conflict in edge case (IDW also)
	const ws = new WebSocket('ws://localhost:8898')
	
	ws.onopen = function(event) {
		displayWallets(config)
	}

	ws.onclosed = function(event) {
		uiState('error', 'connectWallet')
	}
	
	// WEBSOCKET MESSAGE OBJECT FORMAT EXAMPLE
	//
	// {
	// 	"i" : "wallet", (OPTIONS: wallet, wallets, info, password, signature)
	// 	"pubKey":"0x1234abcd",
	// 	"password":1234,
	// 	"nonce":"123412341234"
	// }

	// requests array of wallets from IDW
	async function getWallets() {
		return new Promise((resolve,reject) => {
			ws.send(JSON.stringify({"i":"wallets"}))
			ws.onmessage = event => {
				resolve(JSON.parse(event.data))
			}
		})
	}

	// loop the wallets and add the markup
	async function wLoop(wallets) {
		for (let wallet of wallets) {
			const pubKey = wallet.pubKey
			const unlocked = wallet.unlocked
			const id = wallet.id
			let status
			(unlocked == true) 
				? status = 'circle-arrow-right' 
				: status = 'refresh'
			document
				.getElementById('walletDiv')
				.innerHTML += '<div id="0x' + pubKey + '" style="margin: 10px; padding: 10px; border: 2px #dadada solid; border-radius: 4px;" class="' + status + ' unselectable"><h4 id="'+ id + '" class="yes-' + status + '">0x' + pubKey + '<span class="pull-right" style="padding-right: 10px; margin-bottom: 10px;"><i class="glyphicon glyphicon-' + status + '"></i></span></h4></div>'
		}
	}

	// pull all the wallets from the IDW and display the list in the UI
	async function displayWallets(init) {
		const wallets = await getWallets()
		const list = await wLoop(wallets)
		document
			.getElementById("walletDiv")
			.addEventListener("click", e => {
				const pubKey = e.target.innerText.slice(2)
				const wid = e.target.id
				if (e.target.className == 'yes-circle-arrow-right') {
					confirmInfo(pubKey, wid)
				} else {
					checkWallet(pubKey, wid)
				}
			})
		uiState('wallets')	
	}
	
	// check the status if the wallet is unlocked or not and handle password input
	function checkWallet(pubKey, wid) {
		$('.sk-selected').removeClass('sk-selected')
		$('#'+pubKey).addClass('sk-selected')
		document
			.getElementById('checkWalletDiv')
			.innerHTML = '<div class="pw-row"><td><strong class="text-center" style="color: #ff0000; font-size: 12px;">** Wallet <em>0x' + pubKey + '</em> is locked **</strong><form><div class="input-group"><input class="pw-input form-control" id="walletPassword" type="password" placeholder="Enter Your Password" aria-describedby="lock-icon" required><span class="input-group-addon pw-lock-span" id="lock-icon"><img src="img/lock.png" srcset="img/lock@2x.png 2x, img/lock@3x.png 3x" class="pw-lock-icon"></span></div></form></div>'
		$('#walletPassword').keydown(e => {
			const password = $('#walletPassword').val()
			if (e.which == 13) {
				e.preventDefault()
				ws.send(JSON.stringify({"i" : "password","pubKey": pubKey,"password": password,}))
				ws.onmessage = event => {
					console.log(event)
					confirmInfo(pubKey, wid)
				}
			}
		})
	}

	// gets the information required by the server
	function confirmInfo(pubKey, wid) {
		// connect to the wallet to get the ID attributes
		ws.send(JSON.stringify({"i" : "info","wid": wid,"required": config.required}))
		ws.onmessage = event => {
			var userInfo = JSON.parse(event.data)
			// push the info to the DOM
			document
				.getElementById('infoRequest')
				.innerHTML = '<div class="text-center"><em>' + config.name + '</em> would like to access the following information:</strong><br><h3 class="btn btn-info disabled" id="selectedKey" data-name="' + wid + '">0x' + pubKey + '</h3><div id="infoItems" style="overflow: auto; height: 320px;">'
			for (let info of userInfo) {
				document
					.getElementById('infoItems')
					.innerHTML += '<hr><div id="' + info.tag + '" class="info-row" data-name="' + info.value + '">' + info.display + ': ' + info.value + '<span class="pull-right"><i class="glyphicon glyphicon-info-sign"></i></span></div>'
			}
			document
				.getElementById('infoRequest')
				.innerHTML += '</div>'
			// confirm selection of the wallet for auth
			document
				.getElementById("submitWallet")
				.addEventListener("click", e => {
					const 
						pubKey = document
							.getElementById('selectedKey')
							.innerHTML
						wid = document
							.getElementById('selectedKey')
							.getAttribute('data-name')
					getSignature(pubKey.slice(2), wid)
			})
			// back to wallet view
			document
				.getElementById("backToWallets")
				.addEventListener("click", e => {
					document
						.getElementById('checkWalletDiv')
						.innerHTML = ''
					document
						.getElementById('walletDiv')
						.innerHTML = ''
					displayWallets()
			})
			uiState('confirm')
		}
	}

	// get the signature and verify it with the server
	function getSignature(pubKey, wid) {
		ws.send(JSON.stringify({"i" : "signature","nonce": config.nonce,"pubKey": pubKey,}))
		ws.onmessage = event => {
			const signature = JSON.parse(event.data)
			postAuth(config.nonce, signature, pubKey, config.required)
		}
	}

	// loop through the id attributes in the DOM
	async function tLoop(allTags) {
		const tags = allTags
		let tagValues = []
		for (let tag of tags) {
			if (document.getElementById(tag) !== null && document.getElementById(tag).getAttribute('data-name') !== undefined) {
				let value = document.getElementById(tag).getAttribute('data-name')
				tagValues.push({value: value})
			}
		}
		return tagValues
	}

	// await until the loop is finished then return attribute values
	async function getTagValues(allTags) {
		const result = await tLoop(allTags)
		return result
	}

	// builds final authenticatin request with all the things
	async function postAuth(nonce, signature, pubKey, infoRequest) {
		const info = await getTagValues(infoRequest)
		const formData = {
			nonce: nonce,
			signature: JSON.stringify(signature),
			pubKey: pubKey
		}
		$.ajax({type: 'POST', url: serverBase + '/auth/selfkey', data: formData})
			.fail(e => flasherError(e))
			.done(good => success(good.successUrl))
	}

	async function success(successUrl) {
		chrome.tabs.update({url: successUrl})
	}

	// display errors
	function flasherError(text) {
		$('#flasher-error').removeClass('hidden')
		document
			.getElementById('flasher-error')
			.innerHTML += '<p>' + text + '</p>'
	}

	// TODO combine error/info/success flash messages
	function flasherInfo(text) {
		$('#flasher-info').removeClass('hidden')
		document
			.getElementById('flasher-info')
			.innerHTML += '<p>' + text + '</p>'
	}

	// UI state management hides and displays markup sections and passes args for error view
	function uiState(currentView, args) {
		$('#flasher-error').addClass('hidden')
		document
			.getElementById('flasher-error')
			.innerHTML = ''
		const allViews = [
			'welcome',
			'confirm',
			'wallets',
			'success',
			'error'	
		]
		allViews.forEach(view => {
			(currentView == view) 
				? document
					.getElementById(currentView)
					.style.display = 'block'
				: document
					.getElementById(view)
					.style.display = 'none'
		})
		let errMsg
		(currentView == 'error' && args)
			if (args == 'connectServer') errMsg = '<p>There was an issue connecting with the host server.</p>'
			if (args == 'connectWallet') errMsg = '<div class="alert alert-danger"><h4><strong>Connection Error: ID Wallet Not Found</strong></h4><p>There was an issue connecting with the SelfKey Identity Wallet.  Please ensure you have downloaded, installed and are currently running the ID Wallet application.</p></div><br><a class="btn btn-large btn-info" href="https://selfkey.download.bencrypto.com" target="_blank" style="margin: 10px;"><img src="img/48x48.png">Download SelfKey ID Wallet</a><hr><input class="btn btn-success btn-large" type="button" value="Verify SelfKey ID Wallet Is Running" id="checkConnect">'
		document
			.getElementById('error-message')
			.innerHTML = errMsg
		$('#checkConnect').click(e => {
			document
				.getElementById('failStat')
				.innerHTML += 'failing, '
			checkConnect()
		})
	}
})()
