import React, { Component } from 'react';
import { connect } from 'react-redux';
import { walletsOperations, walletsSelectors } from '../../state/wallets';

class WalletsContainer extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(walletsOperations.loadWallets());
	}
	handleUnlock = (publicKey, password) => {
		this.props.dispatch(walletsOperations.unlockWallet(publicKey, password));
	};
	handleSelect = wallet => {
		this.props.dispatch(walletsOperations.selectWallet(wallet.publicKey));
	};
	render() {
		const { selectedWallet, wallets } = this.props;
		console.log('render', selectedWallet, wallets);
		let html = selectedWallet ? (
			<WalletForm selectedWallet={selectedWallet} onUnlock={this.handleUnlock} />
		) : (
			<WalletSelect wallets={wallets} onSelect={this.handleSelect} />
		);

		return (
			<div>
				Wallets
				{html}
			</div>
		);
	}
}

class WalletForm extends Component {
	constructor(props) {
		super(props);
		this.state = { password: '' };
	}

	handlePasswordChange = evt => {
		this.setState({ password: evt.target.value });
	};
	handleUnlockClick = evt => {
		evt.preventDefault();
		this.props.onUnlock(this.props.selectedWallet.publicKey, this.state.password);
	};

	render() {
		const { selectedWallet } = this.props;
		return (
			<div>
				public key : {selectedWallet.publicKey} <br />
				password:{' '}
				<input
					type="password"
					onChange={this.handlePasswordChange}
					value={this.state.password}
				/>
				<br />
				<button onClick={this.handleUnlockClick}>unlock</button>
			</div>
		);
	}
}

const WalletSelect = ({ wallets, onSelect }) => {
	const handleWalletSelect = wallet => evt => {
		evt.preventDefault();
		onSelect(wallet);
	};

	let walletsHtml = wallets.map(w => (
		<li key={w.publicKey} onClick={handleWalletSelect(w)}>
			{w.publicKey}
		</li>
	));

	return <ul>{walletsHtml}</ul>;
};

const ConnectedWalletsContainer = connect(state => ({
	wallets: walletsSelectors.getWallets(state),
	selectedWallet: walletsSelectors.getSelected(state)
}))(WalletsContainer);

export default ConnectedWalletsContainer;
