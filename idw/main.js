/**
 * LWS ID Wallet Main Process Integration
 **/

// paste at bottom app ready function in /app/main.js

// IDW listening on app startup
// BE pings IDW and establish 2way secure comms
// Default comms using Native Messagins with API fallback if NM fails or testing
// IDW query SQLite for existing wallets and returns result to BE
// BE UI select pubkey (wallet) and eq IDW
// IDW listens in app.run uses rootscope wallet of pubky checks for privkey
// IDW signs challenge function with nonce and privkey and returns signature back to BE

/**
 * LWSInit begin
 **/
electron.ipcMain.on('LWSInit', (event, arg) => {
	/**
	 * LWS Common
	 **/
	const request = require('request');
	const ethUtil = require('ethereumjs-util');
	const keythereum = require('keythereum');
	const knex = require('knex')({
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: path.join(
				electron.app.getPath('userData'),
				'IdentityWalletStorage.sqlite'
			)
		}
	});

	// takes the nonce provided by the server and the private key from the wallet and creates a signature
	function signChallenge(nonce, privKey) {
		return new Promise(resolve => {
			const msgHash = ethUtil.hashPersonalMessage(Buffer.from(nonce, 'hex'));
			const signature = ethUtil.ecsign(msgHash, Buffer.from(privKey, 'hex'));
			resolve(signature);
		});
	}

	// helper function to send message to render process requesting a private key
	function reqPrivKey(pubKey) {
		return new Promise(resolve => {
			resolve(app.win.webContents.send('reqPrivKey', pubKey));
		});
	}

	// helper function to listen for response from renderer process with private key
	function resPrivKey() {
		return new Promise(resolve => {
			electron.ipcMain.on('resPrivKey', (event, msg) => {
				resolve(msg);
			});
		});
	}

	// check individual wallet is unlocked
	async function checkWallet(pubKey) {
		return new Promise(resolve => {
			reqPrivKey(pubKey).then(() => resPrivKey().then(msg => resolve(msg)));
		});
	}

	// check if any wallets are unlocked
	async function checkWallets(wallets) {
		let checkedWallets = [];
		for (let wallet of wallets) {
			const check = await checkWallet(wallet.publicKey);
			let walletObj = {
				id: wallet.id,
				pubKey: wallet.publicKey,
				unlocked: check.status
			};
			checkedWallets.push(walletObj);
		}
		return checkedWallets;
	}

	// TODO: filter query results
	function getWallets() {
		return new Promise((resolve, reject) => {
			knex('wallets')
				.select()
				.then(result => {
					result.length
						? checkWallets(result).then(allWallets => resolve(allWallets))
						: resolve('No wallets found');
				});
		});
	}

	// TODO: filter query result
	function getWallet(pubKey) {
		return new Promise((resolve, reject) => {
			knex('wallets')
				.select('*')
				.where({ publicKey: pubKey })
				.then(result => {
					if (result.length === 1) {
						resolve(result[0]);
					} else {
						resolve({ message: 'No wallets found' });
					}
				});
		});
	}

	function checkUserInfo(result, wid, required) {
		return new Promise((resolve, reject) => {
			var fullInfo = [];
			for (let info of result) {
				const field = info.idAttributeType;
				const p = JSON.parse(info.items);
				const value = p[0].values[0].staticData.line1;
				const id = info.walletId;
				// const r = JSON.parse(required);
				const r = required;
				if (value !== undefined && id === wid) {
					for (let require of r) {
						if (require === field) {
							const infoObj = {
								tag: require,
								display: require,
								value: value
							};
							fullInfo.push(infoObj);
						}
					}
				}
			}
			resolve(fullInfo);
		});
	}

	// get user info based on required
	function getUserInfo(wid, required) {
		return new Promise((resolve, reject) => {
			knex('id_attributes')
				.select()
				.then(result => {
					result.length
						? checkUserInfo(result, wid, required).then(userInfo => {
								resolve(userInfo);
						  })
						: resolve('User info error');
				});
		});
	}

	// check if a password can unlock a keystore file
	function getPassword(pubKey, password) {
		return new Promise((resolve, reject) => {
			getWallet(pubKey).then(wallet => {
				if (wallet.message) {
					reject(wallet.message);
				} else {
					let keystoreFileFullPath = path.join(
						walletsDirectoryPath,
						wallet.keystoreFilePath
					);
					keythereum.importFromFile(keystoreFileFullPath, keystoreObject => {
						try {
							let privateKey = keythereum.recover(password, keystoreObject);
							const data = {
								id: wallet.id,
								isSetupFinished: wallet.isSetupFinished,
								privateKey: privateKey,
								publicKey: keystoreObject.address,
								keystoreFilePath: wallet.keystoreFilePath
							};
							app.win.webContents.send('lwsUnlock', data);
							resolve({
								message: 'Password correct',
								pubKey: keystoreObject.address
							});
						} catch (e) {
							resolve('Incorrect Password');
						}
					});
				}
			});
		});
	}

	// create a signature
	function getSignature(pubKey, nonce) {
		return new Promise((resolve, reject) => {
			checkWallet(pubKey).then(msg => {
				if (msg.privKey) {
					signChallenge(nonce, msg.privKey).then(signature => {
						resolve(signature);
					});
				} else {
					resolve('Error generating signature');
				}
			});
		});
	}

	// get the nonce from the server
	function getNonce(url) {
		request.get({
			url: url
		}, (err, body) => {
			return body
		})
	}

	// get the attribute data needed for auth submission
	function getAttributes(required) {

	}

	// get the document data needed for auth submission
	function getDocuments(required) {

	}

	// send the auth request to the server implementation
	function authLWS(url, pubKey, required) {
		return new Promise((resolve, reject) => {
			const form = {
				pubKey: pubKey,
				nonce: getNonce(url),
				signature: getSignature(pubKey, nonce),
				attributes: getAttributes(required),
				documents: getDocuments(required)
			}
			request.post({
				url: url,
				formData: form
			}, (err, body) => {
				resolve(body)
			})
		})
	}
	/**
	 * LWS Common end
	 **/

	/**
	 * LWS WebSockets
	 **/
	const WebSocket = require('ws');
	const util = require('util');

	// create a websocket server
	const wss = new WebSocket.Server({ port: 8898 });

	// start a handler for the websocket connection
	wss.on('connection', function connection(ws) {
		// listen for incoming messages on the websocket connection
		ws.on('message', function incoming(message) {
			// parse the incoming message string into JSON
			var p = JSON.parse(message);

			// request for all wallets
			if (p.request === 'wallets') {
				getWallets().then(allWallets => {
					ws.send(JSON.stringify({
						"response": "wallets",
						"wallets": allWallets
					}));
				});
			}

			// request for single wallet
			if (p.request === 'wallet') {
				checkWallet(p.pubKey).then(check => {
					var singleWallet = {
						pubKey: check.pubKey,
						status: check.status
					};
					ws.send(JSON.stringify({
						"response": "wallet",
						"wallet": singleWallet
					}));
				});
			}

			// request to unlock keystore file with password
			if (p.request === 'unlock') {
				getPassword(p.pubKey, p.password).then(check => {
					ws.send(JSON.stringify(check));
				});
			}

			// request to check user id attributes
			if (p.request === 'attributes') {
				getUserInfo(p.wid, p.required).then(userInfo => {
					ws.send(JSON.stringify({
						"response": "attributes",
						"attributes": userInfo
					}));
				});
			}

			// request to submit auth request to server
			if (p.request === 'auth') {
				authLWS(p.auth_url, p.pubKey, getNonce(p.nonce_url)).then(authRes => {
					ws.send(JSON.stringify({
						"response": "auth",
						"message": authRes
					}));
				})
			}
			
		});
	});
	/**
	 * LWS WebSockets end
	 **/
});
/**
 * LWSInit end
 **/