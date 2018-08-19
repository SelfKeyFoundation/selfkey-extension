/**
 * LWS Send Data to Main Process
 */
// Paste in bottom of AppReady function in app/src/angular/configs/app.run.js

var ipcRenderer = require('electron').ipcRenderer;

// Needs to check in with main process on startup and establish comms
ipcRenderer.send('LWSInit', 'go');

// Listen for privKey request using pubKey to check if wallet has required data and handle errors
ipcRenderer.on('reqPrivKey', (event, pubKey) => {
	let sendLWSMsg;
	if ($rootScope.wallet) {
		if ($rootScope.wallet.publicKey === pubKey && $rootScope.wallet.privateKeyHex) {
			sendLWSMsg = {
				privKey: $rootScope.wallet.privateKeyHex,
				pubKey: pubKey,
				status: true
			};
		} else {
			sendLWSMsg = { pubKey: pubKey, status: false };
		}
	} else {
		sendLWSMsg = { pubKey: pubKey, status: false };
	}
	ipcRenderer.send('resPrivKey', sendLWSMsg);
});

ipcRenderer.on('lwsUnlock', (event, data) => {
	$rootScope.wallet = new Wallet(
		data.id,
		data.privateKey,
		data.publicKey,
		data.keystoreFilePath
	);
	ipcRenderer.send('unlock-wallet', data.privateKey);
	let promises = [];
	promises.push($rootScope.wallet.loadIdAttributes());
	promises.push($rootScope.wallet.loadTokens());
	Promise.all(promises)
		.then(result => $state.go('member.dashboard.main'))
		.catch(e => console.log(e));
});

/**
 * LWS end of integration
 */