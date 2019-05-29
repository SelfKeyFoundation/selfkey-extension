import React, { Component } from 'react';
import _ from 'lodash';
import { IDIcon, ProfileIcon, LedgerIcon, TrezorIcon } from 'selfkey-ui';
import { LWSButtonPrimary, LWSButtonTertiary } from './lws-button';
import { Typography, withStyles } from '@material-ui/core';
import { LedgerConnect } from './ledger/connect';
import { TrezorConnect } from './trezor';

export const styles = theme => ({
	areaTitle: {
		textAlign: 'center'
	},

	title: {
		textTransform: 'uppercase',
		fontWeight: 'normal',
		fontSize: '16px',
		padding: '25px 0px',
		margin: '0px',
		color: '#23E6FE'
	},

	form: {
		minHeight: '300px'
	},

	formGroup: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0px 0px 30px',
		'&& label': {
			fontSize: '12px',
			color: '#93B0C1',
			textTransform: 'uppercase',
			padding: '0px 0px 5px 0px',
			fontFamily: 'Lato, arial, sans-serif'
		}
	},

	radioReplace: {
		padding: '20px 0px 45px',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	formControl: {
		width: '100%',
		background: '#202A33',
		color: '#fff',
		border: '1px solid #0DC7DD',
		fontSize: '16px',
		padding: '16px',
		height: '52px',
		boxSizing: 'border-box',
		borderRadius: '3px',
		fontFamily: 'Lato, arial, sans-serif',
		'&:focus': {
			outline: 'none',
			boxShadow: '0 0 5px rgba(81, 203, 238, 1)'
		}
	},

	formSubmitRow: {
		marginTop: '15px'
	},

	supportText: {
		textAlign: 'center',
		lineHeight: '22px',
		fontFamily: 'Lato, arial, sans-serif',
		color: '#C5DCE9',
		padding: '0 0 30px',
		fontSize: '16px'
	},

	validationMsg: {
		display: 'block',
		fontSize: '13px',
		color: '#FE4B61',
		padding: '5px 0 0'
	},

	validationError: {
		border: '1px solid #D0021B',
		color: '#FE4B61',
		'&:focus': {
			boxShadow: '0 0 5px rgba(254, 75, 97, 1)'
		}
	}
});

class LWSSelectWalletComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'eth',
			wallet: null,
			password: ''
		};
	}

	componentDidMount() {
		if (this.props.wallets && this.props.wallets.length && !this.state.wallet) {
			this.selectWallet();
		}
	}

	componentDidUpdate() {
		if (this.props.wallets && this.props.wallets.length && !this.state.wallet) {
			this.selectWallet();
		}
	}

	setView(view) {
		return this.setState({ view });
	}

	selectWallet(publicKey) {
		const { wallets } = this.props;

		if (!publicKey) {
			publicKey = wallets[0].publicKey;
		}
		let wallet = _.find(wallets, { publicKey }) || null;
		this.setState({ wallet, password: '' });
		return wallet;
	}

	setWallet(event) {
		this.selectWallet(event.target.value);
	}

	setPassword(event) {
		this.setState({ ...this.state, password: event.target.value });
	}

	login() {
		const { loginAction } = this.props;
		let { wallet, password } = this.state;
		if (!wallet || !wallet.publicKey) {
			wallet = this.selectWallet();
		}
		if (!loginAction || !wallet) {
			return;
		}
		if (!wallet.unlocked && !password) {
			return;
		}
		return loginAction(wallet, password);
	}

	renderLedger() {
		return <LedgerConnect onConnectClick={this.props.onLedgerConnect} />;
	}

	renderTrezor() {
		return <TrezorConnect onConnectClick={this.props.onTrezorConnect} />;
	}

	renderComingSoon() {
		return (
			<Typography variant="body1" className={this.props.classes.supportText}>
				Coming Soon...
			</Typography>
		);
	}

	renderSelection() {
		const { classes, passwordError, wallets } = this.props;
		const { wallet, password, view } = this.state;
		const publicKey = wallet ? wallet.publicKey : '';
		if (view === 'trezor') {
			// return this.renderTrezor();
			return this.renderComingSoon();
		} else if (view === 'ledger') {
			// return this.renderLedger();
			return this.renderComingSoon();
		} else {
			return (
				<div>
					<div className={classes.formGroup}>
						<label>Choose an existing ETH Address</label>
						<select
							id="eth-address"
							className={classes.formControl}
							onChange={evt => this.setWallet(evt)}
							value={publicKey}
						>
							{wallets.filter(w => w.profile === 'local').map((wallet, index) => {
								return (
									<option key={index} value={wallet.publicKey}>
										{wallet.name ? `${wallet.name} - ` : null}
										0x
										{wallet.publicKey.replace('0x', '')}
									</option>
								);
							})}
						</select>
					</div>
					{wallet && wallet.unlocked ? null : (
						<div className={classes.formGroup}>
							<label>Password</label>
							<input
								type="password"
								ref="password"
								id="password"
								className={`${classes.formControl} ${
									passwordError ? classes.validationError : ''
								}`}
								onChange={evt => this.setPassword(evt)}
								placeholder="Enter your password"
								value={password}
							/>
							{passwordError && (
								<div className={classes.validationMsg}>
									Incorrect Password. Please try again.
								</div>
							)}
						</div>
					)}
					<div className={classes.formSubmitRow}>
						<LWSButtonPrimary onClick={() => this.login()}>Log in</LWSButtonPrimary>
					</div>
				</div>
			);
		}
	}

	render() {
		const { classes } = this.props;
		const { view } = this.state;
		return (
			<div>
				<div className={classes.areaTitle}>
					<IDIcon />
					<Typography variant="h2" className={classes.title}>
						Verify Ownership Of Your SelfKey ID
					</Typography>
				</div>
				<div className={classes.form}>
					<div className={`${classes.formGroup} ${classes.radioReplace}`}>
						<LWSButtonTertiary
							selected={view === 'eth'}
							onClick={() => this.setView('eth')}
						>
							<ProfileIcon width="28px" height="25px" />
							<span>ETH Address</span>
						</LWSButtonTertiary>
						<LWSButtonTertiary
							selected={view === 'ledger'}
							onClick={() => this.setView('ledger')}
						>
							<LedgerIcon /> <span>Ledger</span>
						</LWSButtonTertiary>
						<LWSButtonTertiary
							selected={view === 'trezor'}
							onClick={() => this.setView('trezor')}
						>
							<TrezorIcon /> <span>Trezor</span>
						</LWSButtonTertiary>
					</div>
					{this.renderSelection()}
				</div>
			</div>
		);
	}
}

export const LWSSelectWallet = withStyles(styles)(LWSSelectWalletComponent);

export default LWSSelectWallet;
