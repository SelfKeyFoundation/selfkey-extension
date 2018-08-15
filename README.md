# SelfKey Connect Browser Extension

## About SelfKey Connect
To create both a convenient user interface and a communications link between the IDW and the LWS server integration, we have developed SelfKey Connect - a Web Browser Extension that provides the user with a way to interact with the other related components directly from the browser window. In its current implementation it can select available wallet addresses and unlock them remotely using password / keystore file and then choose the wallet for authentication using LWS simultaneously directing the IDW to pass over the data and documents requested by the server integration if needed.

## Features
* View Wallets Available -> request to IDW, takes response array and displays in UI
* View Wallets Status -> returned in IDW response, adds different icon and CSS class in
* Select a Wallet for Authentication
* Unlock a Wallet w/ Password
* Displays requested information from server
* Submits authentication credentials and requested info to server
* Handles various error cases
* Redirects to success page in browser

## Development

* Go to `chrome://extensions/` in your Chrome browser
* Enable the "Developer Mode" toggle
* Click "Load Unpacked" from the navbar
* Select the `src` directory of the repository

The SelfKey Connect Browser Extension should now be enabled.

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).

## License

The MIT License (MIT)

Copyright (c) 2018 SelfKey Foundation

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.