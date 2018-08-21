'use strict';
/* global $ */
var port = chrome.runtime.connect({ name: 'LWS_INIT' });

// this should handle all the errors right? :D
port.onMessage.addListener(msg => {
	if (msg.error) {
		uiState('error', msg.error);
	}
});

// attempt to load initial UI state with wallets list
displayWallets();

// requests array of wallets from IDW
function getWallets() {
	return new Promise((resolve, reject) => {
		console.log('here1');
		port.postMessage({
			request: 'wallets'
		});
		port.onMessage.addListener(msg => {
			console.log('here??');
			if (msg.response === 'wallets') {
				resolve(msg.wallets);
			} else {
				resolve(console.log('numpty'));
			}
		});
	});
}

// loop the wallets and add the markup
function wLoop(wallets) {
	return new Promise((resolve, reject) => {
		for (let wallet of wallets) {
			const pubKey = wallet.pubKey;
			const unlocked = wallet.unlocked;
			const id = wallet.id;
			let status;
			unlocked === true ? (status = 'circle-arrow-right') : (status = 'refresh');
			document.getElementById('walletDiv').innerHTML +=
				'<div id="0x' +
				pubKey +
				'" style="margin: 10px; padding: 10px; border: 2px #dadada solid; border-radius: 4px;" class="' +
				status +
				' unselectable"><h4 id="' +
				id +
				'" class="yes-' +
				status +
				'">0x' +
				pubKey +
				'<span class="pull-right" style="padding-right: 10px; margin-bottom: 10px;"><i class="glyphicon glyphicon-' +
				status +
				'"></i></span></h4></div>';
		}
		resolve('done');
	});
}

// pull all the wallets from the IDW and display the list in the UI
function displayWallets() {
	console.log('here');
	getWallets().then(wallets => {
		console.log('HERE');
		wLoop(wallets).then(() => {
			document.getElementById('walletDiv').addEventListener('click', e => {
				const pubKey = e.target.innerText.slice(2);
				const wid = e.target.id;
				if (e.target.className === 'yes-circle-arrow-right') {
					confirmInfo(pubKey, wid);
				} else {
					checkWallet(pubKey, wid);
				}
			});
			uiState('wallets');
		});
	});
}

// check the status if the wallet is unlocked or not and handle password input
function checkWallet(pubKey, wid) {
	$('.sk-selected').removeClass('sk-selected');
	$('#' + pubKey).addClass('sk-selected');
	document.getElementById('checkWalletDiv').innerHTML =
		'<div class="pw-row"><td><strong class="text-center" style="color: #ff0000; font-size: 12px;">** Wallet <em>0x' +
		pubKey +
		'</em> is locked **</strong><form><div class="input-group"><input class="pw-input form-control" id="walletPassword" type="password" placeholder="Enter Your Password" aria-describedby="lock-icon" required><span class="input-group-addon pw-lock-span" id="lock-icon"><img src="img/lock.png" srcset="img/lock@2x.png 2x, img/lock@3x.png 3x" class="pw-lock-icon"></span></div></form></div>';
	$('#walletPassword').keydown(e => {
		const password = $('#walletPassword').val();
		if (e.which === 13) {
			e.preventDefault();

			port.postMessage({
				request: 'unlock',
				pubKey: pubKey,
				password: password
			});

			port.onMessage.addListener(msg => {
				if (msg.response === 'unlock') {
					return confirmInfo(msg.pubKey, msg.wid);
				} else {
					return console.log('numpty');
				}
			});
		}
	});
}

// gets the information required by the server
function confirmInfo(pubKey, wid) {
	// connect to the wallet to get the ID attributes
	port.postMessage({
		request: 'info',
		wid: wid
	});

	port.onMessage.addListener(msg => {
		var userInfo = msg.user;
		// if (event.data.err) then return uiState=('error', event.data.err)
		// push the info to the DOM
		let config = {}; // TODO: Where config comes from?
		document.getElementById('infoRequest').innerHTML =
			'<div class="text-center"><em>' +
			config.name +
			'</em> would like to access the following information:</strong><br><h3 class="btn btn-info disabled" id="selectedKey" data-name="' +
			wid +
			'">0x' +
			pubKey +
			'</h3><div id="infoItems" style="overflow: auto; height: 320px;">';
		for (let info of userInfo) {
			document.getElementById('infoItems').innerHTML +=
				'<hr><div id="' +
				info.tag +
				'" class="info-row" data-name="' +
				info.value +
				'">' +
				info.display +
				': ' +
				info.value +
				'<span class="pull-right"><i class="glyphicon glyphicon-info-sign"></i></span></div>';
		}
		document.getElementById('infoRequest').innerHTML += '</div>';
		// confirm selection of the wallet for auth
		document.getElementById('submitWallet').addEventListener('click', e => {
			const pubKey = document.getElementById('selectedKey').innerHTML;
			wid = document.getElementById('selectedKey').getAttribute('data-name');
			getSignature(pubKey.slice(2), wid);
		});
		// back to wallet view
		document.getElementById('backToWallets').addEventListener('click', e => {
			document.getElementById('checkWalletDiv').innerHTML = '';
			document.getElementById('walletDiv').innerHTML = '';
			displayWallets();
		});
		uiState('confirm');
	});
}

// get the signature and verify it with the server
function getSignature(pubKey, wid) {
	port.postMessage({
		request: 'auth',
		pubKey: pubKey
	});

	port.onMessage.addListener(msg => {
		if (msg.response === 'auth') {
			return confirmInfo(msg.pubKey, msg.wid);
		} else {
			return console.log('numpty');
		}
	});

	// TODO: where is ws defined?
	// TODO: where is config defined?
	// ws.send(JSON.stringify({ i: 'signature', nonce: config.nonce, pubKey: pubKey }));
	// ws.onmessage = event => {
	// 	const signature = JSON.parse(event.data);
	// 	// if (event.data.err) then return uiState('error', event.data.err)
	// 	postAuth(config.nonce, signature, pubKey, config.required);
	// };
}

// loop through the id attributes in the DOM
// function tLoop(allTags) {
// 	const tags = allTags;
// 	let tagValues = [];
// 	for (let tag of tags) {
// 		if (
// 			document.getElementById(tag) !== null &&
// 			document.getElementById(tag).getAttribute('data-name') !== undefined
// 		) {
// 			let value = document.getElementById(tag).getAttribute('data-name');
// 			tagValues.push({ value: value });
// 		}
// 	}
// 	return tagValues;
// }

// TODO: where is getTagValues used?
// await until the loop is finished then return attribute values
// async function getTagValues(allTags) {
// 	const result = await tLoop(allTags);
// 	return result;
// }

// TODO: where is postAuth used?

// builds final authenticatin request with all the things
// async function postAuth(nonce, signature, pubKey, infoRequest) {
// 	let serverBase = ''; // TODO: where serverBase comes from?
// 	// TODO: where is info used?
// 	// const info = await getTagValues(infoRequest);
// 	const formData = {
// 		nonce: nonce,
// 		signature: JSON.stringify(signature),
// 		pubKey: pubKey
// 	};
// 	$.ajax({ type: 'POST', url: serverBase + '/auth/selfkey', data: formData })
// 		.fail(e => flasherError(e))
// 		.done(good => success(good.successUrl));
// }

// async function success(successUrl) {
// 	chrome.tabs.update({ url: successUrl });
// }

// // display errors
// function flasherError(text) {
// 	$('#flasher-error').removeClass('hidden');
// 	document.getElementById('flasher-error').innerHTML += '<p>' + text + '</p>';
// }

// TODO combine error/info/success flash messages
// TODO: where is flasherInfo used?
// function flasherInfo(text) {
// 	$('#flasher-info').removeClass('hidden');
// 	document.getElementById('flasher-info').innerHTML += '<p>' + text + '</p>';
// }

// UI state management hides and displays markup sections and passes args for error view
function uiState(currentView, args) {
	$('#flasher-error').addClass('hidden');
	document.getElementById('flasher-error').innerHTML = '';
	const allViews = ['welcome', 'confirm', 'wallets', 'success', 'error'];
	allViews.forEach(view => {
		currentView === view
			? (document.getElementById(currentView).style.display = 'block')
			: (document.getElementById(view).style.display = 'none');
	});
	let errMsg;
	// TODO: what is this?
	// currentView == 'error' && args;
	if (args === 'connectServer')
		errMsg = '<p>There was an issue connecting with the host server.</p>';
	if (args === 'connectWallet')
		errMsg =
			'<div class="alert alert-danger"><h4><strong>Connection Error: ID Wallet Not Found</strong></h4><p>There was an issue connecting with the SelfKey Identity Wallet.  Please ensure you have downloaded, installed and are currently running the ID Wallet application.</p></div><br><a class="btn btn-large btn-info" href="https://selfkey.download.bencrypto.com" target="_blank" style="margin: 10px;"><img src="img/48x48.png">Download SelfKey ID Wallet</a><hr><input class="btn btn-success btn-large" type="button" value="Verify SelfKey ID Wallet Is Running" id="checkConnect">';
	document.getElementById('error-message').innerHTML = errMsg;
	$('#checkConnect').click(e => {
		document.getElementById('failStat').innerHTML += 'failing, ';
		// TODO: where is checkConnect defined?
		// checkConnect();
	});
}
