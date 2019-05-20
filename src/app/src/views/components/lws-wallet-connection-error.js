import React from 'react';
import { withStyles } from '@material-ui/core';
import { LWSButtonPrimary } from './lws-button';
import { WalletIcon } from 'selfkey-ui';
import { LWSError } from './lws-error';

const styles = theme => ({
	buttonPrimary: {
		fontFamily: 'Lato, arial, sans-serif',
		color: '#fff',
		background: 'linear-gradient(0deg, #09A8BA 0%, #0ABBD0 100%)',
		border: 0,
		width: '100%',
		'&:hover': {
			background: 'linear-gradient(45deg, #09A8BA 0%, #0ABBD0 100%)'
		},
		fontWeight: 700
	},

	buttonSecondary: {
		fontFamily: 'Lato, arial, sans-serif',
		marginTop: '30px',
		color: '#1CA9BA',
		background: '#202A33',
		border: '2px solid #1CA9BA',
		width: '100%',
		'&:hover': {
			background: '#293743'
		},
		fontWeight: 700
	}
});

export const LWSWalletConnectionError = withStyles(styles)(
	({ classes, downloadWalletAction, retryAction }) => (
		<LWSError
			actionIcon={<WalletIcon />}
			actionName="Action Required"
			errorName="Install & Open The SelfKey Identity Wallet"
			supportText="The SelfKey Identity Wallet is required to securely authenticate with this website. Please download and open the SelfKey Identity Wallet to proceed."
			actionButton={
				<div>
					<LWSButtonPrimary onClick={downloadWalletAction}>
						Download The SelfKey Wallet
					</LWSButtonPrimary>
					<LWSButtonPrimary className={classes.buttonSecondary} onClick={retryAction}>
						Retry
					</LWSButtonPrimary>
				</div>
			}
		/>
	)
);

export default LWSWalletConnectionError;
