import React from 'react';
import { Typography, Grid, withStyles } from '@material-ui/core';
import { HourGlassLargeIcon } from 'selfkey-ui';
import { LWSButtonSecondary } from '../lws-button';

const styles = theme => ({
	fullWidth: { width: '100%' }
});

export const HardwareWalletAuthError = withStyles(styles)(({ classes, walletType, onBack }) => {
	const typeText = walletType.charAt(0).toUpperCase() + walletType.slice(1);
	return (
		<Grid container direction="column" justify="flex-start" alignItems="center" spacing={40}>
			<Grid item>
				<HourGlassLargeIcon />
			</Grid>
			<Grid item>
				<Typography variant="h1">Authentication Error with {typeText}</Typography>
			</Grid>
			<Grid item>
				<Typography variant="body1">
					There was an error when authenticating with the service using your {typeText}.
					Please try again.
				</Typography>
			</Grid>
			<Grid item className={classes.fullWidth}>
				<LWSButtonSecondary onClick={onBack}>Back</LWSButtonSecondary>
			</Grid>
		</Grid>
	);
});

export default HardwareWalletAuthError;
