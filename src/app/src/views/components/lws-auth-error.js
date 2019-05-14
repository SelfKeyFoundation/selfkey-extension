import React from 'react';
import { LWSButton } from './lws-button';
import { ShieldIcon } from 'selfkey-ui';
import { LWSError } from './lws-error';
import { withStyles } from '@material-ui/core';

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

export const LWSAuthError = withStyles(styles)(({ classes, website, retryAction }) => (
	<LWSError
		actionIcon={<ShieldIcon />}
		actionName="Authentication Error"
		errorName={`We can't connect you with ${website.name}`}
		supportText="There’s seems to be a problem with the authentication process at the moment. Please try again!"
		actionButton={
			<LWSButton className={classes.buttonSecondary} onClick={retryAction}>
				Retry
			</LWSButton>
		}
	/>
));

export default LWSAuthError;
