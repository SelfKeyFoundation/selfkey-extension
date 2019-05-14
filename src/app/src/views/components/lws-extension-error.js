import React from 'react';
import { LWSButton } from './lws-button';
import { DownloadIcon } from '../icons/download';
import { withStyles } from '@material-ui/core';

const styles = () => ({
	buttonPrimary: {
		fontFamily: 'Lato, arial, sans-serif',
		color: '#fff',
		background: 'linear-gradient(0deg, #09A8BA 0%, #0ABBD0 100%)',
		border: 0,
		width: '100%',
		'&:hover': {
			background: 'linear-gradient(45deg, #09A8BA 0%, #0ABBD0 100%)'
		}
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
		}
	},

	form: {
		minHeight: '300px'
	},

	formSubmitRow: {
		marginTop: '15px',
		'& button': {
			marginTop: '30pxd',
			fontWeight: 700
		}
	},

	supportText: {
		textAlign: 'center',
		lineHeight: '22px',
		fontFamily: 'Lato, arial, sans-serif',
		color: '#C5DCE9',
		padding: '0 0 30px',
		fontSize: '16px'
	},

	areaTitle: {
		textAlign: 'center',
		'& h2': {
			textTransform: 'uppercase',
			fontWeight: 'normal',
			fontSize: '16px',
			padding: '25px 0',
			margin: 0,
			color: '#D97300'
		},
		'& h3': {
			fontWeight: 'normal',
			fontSize: '21px',
			padding: '0 0 45px',
			margin: 0,
			color: '#93B0C1'
		}
	}
});

export const LWSExtensionError = withStyles(styles)(
	({ classes, children, installExtensionAction }) => (
		<div>
			<div className={classes.areaTitle}>
				<DownloadIcon />
				<h2>Action Required</h2>
				<h3>Install Login With SelfKey Browser Extension</h3>
			</div>
			<div className={classes.form}>
				<p className={classes.supportText}>
					Login With SelfKey is a browser extension that allows you to securely login to
					this website through your SelfKey ID and Ethereum address, powered by the
					SelfKey Identity Wallet.
				</p>
				<div className={classes.formSubmitRow}>
					<LWSButton className={classes.buttonPrimary} onClick={installExtensionAction}>
						Install Browser Extension
					</LWSButton>
				</div>
			</div>
		</div>
	)
);

export default LWSExtensionError;
