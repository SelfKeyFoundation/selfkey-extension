import React from 'react';
import { LWSButtonSecondary } from './lws-button';
import { ShieldIcon } from 'selfkey-ui';
import { LWSError } from './lws-error';
import { withStyles } from '@material-ui/core';

const styles = theme => ({});

export const LWSAuthError = withStyles(styles)(({ classes, website, retryAction }) => (
	<LWSError
		actionIcon={<ShieldIcon />}
		actionName="Authentication Error"
		errorName={`We can't connect you with ${website.name}`}
		supportText="There’s seems to be a problem with the authentication process at the moment. Please try again!"
		actionButton={<LWSButtonSecondary onClick={retryAction}>Retry</LWSButtonSecondary>}
	/>
));

export default LWSAuthError;
