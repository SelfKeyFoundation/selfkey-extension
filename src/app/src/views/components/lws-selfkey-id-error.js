import React from 'react';
import { withStyles } from '@material-ui/core';
import { LWSButtonPrimary } from './lws-button';
import { ShieldIcon } from 'selfkey-ui';
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

export const LWSSelfkeyIdError = withStyles(styles)(({ classes, children, retryAction }) => (
	<LWSError
		actionIcon={<ShieldIcon />}
		actionName="Action Required"
		errorName="Create & Unlock Your SelfKey ID"
		supportText="A SelfKey ID is required to securely authenticate your identity with this website. Please create one in the SelfKey Identity Wallet and keep it open to proceed."
		actionButton={
			<LWSButtonPrimary className={classes.buttonSecondary} onClick={retryAction}>
				Retry
			</LWSButtonPrimary>
		}
	/>
));

export default LWSSelfkeyIdError;
