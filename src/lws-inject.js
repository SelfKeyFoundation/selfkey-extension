(function(window, document) {
	'use strict';
	// injected to customer web page

	function injectHTML(el, data) {
		if (!el && !el.innerHTML) return;
		el.innerHTML = tpl(data);
	}

	function tpl(data) {
		return `
        <div class="modal fade" id="skLogin" tabindex="-1" role="dialog" aria-labelledby="skLoginLabel">
            <div class="modal-dialog text-center" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="font-family: 'Proxima Nova','Helvetica Neue', Helvetica, Arial, sans-serif; background: #1e7287; color: #fff;"><span class="pull-left"><li class="dropdown sk-logo"><a class="dropdown-toggle" href="#" data-toggle="dropdown"><img src="images/self-key-icon.png" srcset="images/self-key-icon@2x.png 2x, images/self-key-icon@3x.png 3x" class="btn-selfkey-logo">&nbsp;&nbsp;Login with SelfKey</a><ul class="dropdown-menu"><li><a id="aboutSK" href="https://selfkey.org" target="_blank">About Selfkey</a></li><li><a id="helpSK" href="https://help.selfkey.org" target="_blank">Help and Support</a></li></ul></li></span>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body" style="color: rgba(0,0,0,0.6);">
                        <style>
                        iframe {
                            border-width: 0;
                        }
                        </style>
                        <div class="text-center">
                            <div class="lws_wrapper" id="lws_wrapper" style="display: none;">
                                <iframe id="lws_iframe" src="${
									data.mainUrl
								}" scrolling="yes" style="display: none;"></iframe>
                            </div>
                        </div>
                        <div id="lws_default">
                            <!-- <div class="col-md-offset-2 col-md-8">-->
                            <p>In order to use the Login with SelfKey service, please follow these steps:</p>
                            <p>1. Install and Enable the SelfKey Browser Extension from the Chrome Web Store:</p><a class="btn btn-large btn-primary" href="https://selfkey.download.bencrypto.com" target="_blank" style="margin: 10px;"><img src="images/chrome.png">  Download SelfKey Browser Extension</a>
                            <br><strong style="color: #ff0000;">IMPORTANT: Make sure the SelfKey Browser Extension is enable by checking for the SelfKey icon the top right corner of your Chrome browser</strong>
                            <br>
                            <br>
                            <p>2. Install and Setup your SelfKey ID Wallet</p><a class="btn btn-large btn-info" href="https://selfkey.download.bencrypto.com" target="_blank" style="margin: 10px;"><img src="images/48x48.png">  Download SelfKey ID Wallet</a>
                            <br>
                            <br>
                            <p>Once you have downloaded and enabled the SelfKey Browser Extension and installed the SelfKey ID Wallet click the verify button below:</p><a></a>
                            <input class="btn btn-success btn-large" type="button" value="Verify SelfKey Login Installed" onclick="window.location.reload()">
                            <br>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
	}

	function resolveDomElements(el) {
		if (Array.isArray(el)) {
			return el;
		}
		if (typeof el === 'string') {
			return document.querySelectorAll(el);
		}
		return [el];
	}

	function listenToAuthResponse(cb) {
		// TODO: implement auth resonse callback
	}

	function initLWS(config) {
		if (!config.el) {
			console.error('LWS: please provide dom element or selector for LWS');
			return;
		}
		var els = resolveDomElements(config.el);
		els.forEach(function initLWSForDomElement(el) {
			injectHTML(el, window.lws.data);
		});
		var sendConf = {
			requested: config.requested,
			attributes: config.attributes,
			path: config.path
		};

		if (config.onAuthResponse && typeof config.onAuthResponse === 'function') {
			listenToAuthResponse(config.onAuthResponse);
			sendConf.hasAuthCb = true;
		}

		sendInitMessage(config, window.lws.data);
	}

	function teardownLWS() {
		// TODO: implement teardown LWS
	}

	function sendInitMessage(config, data) {
		let msg = {
			type: 'init',
			payload: config,
			meta: {
				hash: data.hash
			}
		};
		window.postMessage(msg);
	}

	function main() {
		window.lws.control = {
			init: initLWS,
			teardown: teardownLWS
		};
	}

	main();
})(window, document);
