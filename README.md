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
SelfKey Connect Browser Extension    
Copyright (c) 2018 SelfKey Foundation [https://selfkey.org/](https://selfkey.org/)

[The GPL-3.0 License](http://opensource.org/licenses/GPL-3.0)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
